import {
  AppRunnerClient,
  ListOperationsCommand,
  ListServicesCommand,
  OperationStatus,
  PauseServiceCommand,
  ResumeServiceCommand,
} from '@aws-sdk/client-apprunner';

import {pauseOrResume} from '../impl';

jest.mock('../client-factory', () => ({
  createClient(): Pick<AppRunnerClient, 'send'> {
    return {
      async send(
        command:
          | ListServicesCommand
          | PauseServiceCommand
          | ResumeServiceCommand
          | ListOperationsCommand
      ) {
        if (command instanceof ListServicesCommand) {
          return listServices(command);
        } else if (command instanceof PauseServiceCommand) {
          return pauseService(command);
        } else if (command instanceof ResumeServiceCommand) {
          return resumeService(command);
        } else if (command instanceof ListOperationsCommand) {
          return listOperations(command);
        }
      },
    };
  },
}));

jest.mock('../client-config', () => ({
  maxResults: {
    ListServices: 1,
    ListOperations: 1,
  },
  retryTimeout: 1,
}));

const listServices = jest.fn();
const pauseService = jest.fn();
const resumeService = jest.fn();
const listOperations = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();

  listServices
    .mockResolvedValueOnce({
      NextToken: 'token-1',
      ServiceSummaryList: [
        {
          ServiceArn: 'arn-1',
          ServiceName: 'service-1',
        },
      ],
    })
    .mockResolvedValueOnce({
      NextToken: 'token-2',
      ServiceSummaryList: [
        {
          ServiceArn: 'arn-2',
          ServiceName: 'service-2',
        },
      ],
    })
    .mockResolvedValueOnce({ServiceSummaryList: []});
});

test('pauses the service when the pause operation is requested', async () => {
  pauseService.mockImplementation(() => Promise.reject());

  await expect(pauseOrResume('service-2', 'pause')).rejects.toBeDefined();

  expect(pauseService.mock.lastCall[0]).toBeInstanceOf(PauseServiceCommand);
  expect(pauseService.mock.lastCall[0].input).toEqual({ServiceArn: 'arn-2'});
  expect(resumeService).not.toHaveBeenCalled();
});

test('resumes the service when the resume operation is requested', async () => {
  pauseService.mockImplementation(() => Promise.reject());

  await expect(pauseOrResume('service-2', 'resume')).rejects.toBeDefined();

  expect(resumeService.mock.lastCall[0]).toBeInstanceOf(ResumeServiceCommand);
  expect(resumeService.mock.lastCall[0].input).toEqual({ServiceArn: 'arn-2'});
  expect(pauseService).not.toHaveBeenCalled();
});

test('rejects when no service exists for the given name', async () => {
  expect(pauseOrResume('nonexisting', 'pause')).rejects.toBeDefined();

  expect(pauseService).not.toHaveBeenCalled();
  expect(resumeService).not.toHaveBeenCalled();
  expect(listOperations).not.toHaveBeenCalled();
});

test('exits without error when no service exists for the given name', async () => {
  expect(pauseOrResume('nonexisting', 'pause', true)).resolves.toBeUndefined();

  expect(pauseService).not.toHaveBeenCalled();
  expect(resumeService).not.toHaveBeenCalled();
  expect(listOperations).not.toHaveBeenCalled();
});

test('rejects when operation fails', async () => {
  pauseService.mockImplementation(() => Promise.reject());

  await expect(pauseOrResume('service-2', 'pause')).rejects.toBeDefined();

  expect(resumeService).not.toHaveBeenCalled();
  expect(listOperations).not.toHaveBeenCalled();
});

test('rejects when no operation for the operation id could be found', async () => {
  pauseService.mockResolvedValueOnce({OperationId: 'operation-1'});
  listOperations.mockResolvedValueOnce({OperationSummaryList: []});

  await expect(pauseOrResume('service-2', 'pause')).rejects.toBeDefined();

  expect(resumeService).not.toHaveBeenCalled();
  expect(listOperations.mock.lastCall[0].input).toEqual({
    ServiceArn: 'arn-2',
    MaxResults: 1,
  });
});

test('rejects when operation is in status FAILED', async () => {
  pauseService.mockResolvedValueOnce({OperationId: 'operation-1'});
  listOperations
    .mockResolvedValueOnce({
      OperationSummaryList: [
        {Id: 'operation-1', Status: OperationStatus.IN_PROGRESS},
      ],
    })
    .mockResolvedValueOnce({
      OperationSummaryList: [
        {Id: 'operation-1', Status: OperationStatus.FAILED},
      ],
    });

  await expect(pauseOrResume('service-2', 'pause')).rejects.toBeDefined();

  expect(pauseService.mock.lastCall[0].input).toEqual({ServiceArn: 'arn-2'});
  expect(resumeService).not.toHaveBeenCalled();
  expect(listOperations.mock.lastCall[0].input).toEqual({
    ServiceArn: 'arn-2',
    MaxResults: 1,
  });
});

test('rejects when operation is in status FAILED', async () => {
  pauseService.mockResolvedValueOnce({OperationId: 'operation-1'});
  listOperations
    .mockResolvedValueOnce({
      OperationSummaryList: [
        {Id: 'operation-1', Status: OperationStatus.ROLLBACK_IN_PROGRESS},
      ],
    })
    .mockResolvedValueOnce({
      OperationSummaryList: [
        {Id: 'operation-1', Status: OperationStatus.ROLLBACK_FAILED},
      ],
    });

  await expect(pauseOrResume('service-2', 'pause')).rejects.toBeDefined();

  expect(pauseService.mock.lastCall[0].input).toEqual({ServiceArn: 'arn-2'});
  expect(resumeService).not.toHaveBeenCalled();
  expect(listOperations.mock.lastCall[0].input).toEqual({
    ServiceArn: 'arn-2',
    MaxResults: 1,
  });
});

test('resolves when operation is in status SUCCEEDED', async () => {
  pauseService.mockResolvedValueOnce({OperationId: 'operation-1'});
  listOperations
    .mockResolvedValueOnce({
      OperationSummaryList: [
        {Id: 'operation-1', Status: OperationStatus.IN_PROGRESS},
      ],
    })
    .mockResolvedValueOnce({
      OperationSummaryList: [
        {Id: 'operation-1', Status: OperationStatus.SUCCEEDED},
      ],
    });

  await expect(pauseOrResume('service-2', 'pause')).resolves.toBeUndefined();

  expect(pauseService.mock.lastCall[0].input).toEqual({ServiceArn: 'arn-2'});
  expect(resumeService).not.toHaveBeenCalled();
  expect(listOperations.mock.lastCall[0].input).toEqual({
    ServiceArn: 'arn-2',
    MaxResults: 1,
  });
});

test('resolves when operation is in status ROLLBACK_SUCCEEDED', async () => {
  pauseService.mockResolvedValueOnce({OperationId: 'operation-1'});
  listOperations
    .mockResolvedValueOnce({
      OperationSummaryList: [
        {Id: 'operation-1', Status: OperationStatus.ROLLBACK_IN_PROGRESS},
      ],
    })
    .mockResolvedValueOnce({
      OperationSummaryList: [
        {Id: 'operation-1', Status: OperationStatus.ROLLBACK_SUCCEEDED},
      ],
    });

  await expect(pauseOrResume('service-2', 'pause')).resolves.toBeUndefined();

  expect(pauseService.mock.lastCall[0].input).toEqual({ServiceArn: 'arn-2'});
  expect(resumeService).not.toHaveBeenCalled();
  expect(listOperations.mock.lastCall[0].input).toEqual({
    ServiceArn: 'arn-2',
    MaxResults: 1,
  });
});
