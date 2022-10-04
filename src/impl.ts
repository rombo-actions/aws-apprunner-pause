import {
  ListOperationsCommand,
  ListServicesCommand,
  OperationStatus,
  PauseServiceCommand,
  ResumeServiceCommand,
  ServiceSummary,
} from '@aws-sdk/client-apprunner';

import {Operation} from './operation';
import config from './client-config';
import {createClient} from './client-factory';
import {debug} from '@actions/core';

const client = createClient();

export async function pauseOrResume(
  name: string,
  operation: Operation,
  allowMissingService = false
) {
  const service = await findService(name);

  if (service != null) {
    debug('Found service, attempting operation');
    const operationId = await doPauseOrResume(service, operation);

    if (operationId != null) {
      await checkOperationUntilDone(service, operationId);
    }
  } else if (!allowMissingService) {
    throw new Error(`No service with name [${name}] could be found`);
  }
}

async function checkOperationUntilDone(
  service: ServiceSummary,
  operationId: string
) {
  let operation = await findOperation(service, operationId);

  while (
    operation.Status !== OperationStatus.FAILED &&
    operation.Status !== OperationStatus.SUCCEEDED &&
    operation.Status !== OperationStatus.ROLLBACK_FAILED &&
    operation.Status !== OperationStatus.ROLLBACK_SUCCEEDED
  ) {
    await new Promise((resolve) => setTimeout(resolve, config.retryTimeout));
    operation = await findOperation(service, operationId);
  }

  if (
    operation.Status === OperationStatus.FAILED ||
    operation.Status === OperationStatus.ROLLBACK_FAILED
  ) {
    throw new Error('Pause operation failed!');
  }
}

async function findOperation(
  {ServiceArn}: ServiceSummary,
  operationId: string
) {
  const response = await client.send(
    new ListOperationsCommand({
      MaxResults: config.maxResults.ListOperations,
      ServiceArn,
    })
  );

  const operation = response.OperationSummaryList?.find(
    (summary) => summary.Id === operationId
  );

  if (operation == null) {
    throw new Error(`No operation with id [${operationId}] found!`);
  }

  return operation;
}

async function doPauseOrResume(
  {ServiceArn}: ServiceSummary,
  operation: Operation
) {
  const input = {ServiceArn};
  const command =
    operation === 'pause'
      ? new PauseServiceCommand(input)
      : new ResumeServiceCommand(input);
  try {
    debug('Sending command');
    debug(operation);
    const {OperationId} = await client.send(command);

    if (OperationId == null) {
      throw new Error(
        'Operation submitted successfully but no OperationId was provided'
      );
    }

    return OperationId;
  } catch (e) {
    throw new Error('Failed to submit operation');
  }
}

async function findService(name: string): Promise<ServiceSummary | null> {
  for await (const summary of findAllServices()) {
    if (summary.ServiceName === name) {
      return summary;
    }
  }

  return null;
}

async function* findAllServices() {
  const MaxResults = config.maxResults.ListServices;

  const command = new ListServicesCommand({MaxResults});
  let response = await client.send(command);

  if (!response.ServiceSummaryList?.length) {
    return;
  }

  for (const summary of response.ServiceSummaryList) {
    yield summary;
  }

  while (response.NextToken != null) {
    const command = new ListServicesCommand({
      MaxResults,
      NextToken: response.NextToken,
    });
    response = await client.send(command);

    if (!response.ServiceSummaryList?.length) {
      break;
    }

    for (const summary of response.ServiceSummaryList) {
      yield summary;
    }
  }
}
