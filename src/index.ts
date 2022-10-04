import {getInput} from '@actions/core';

import {isOperation} from './operation';
import {pauseOrResume} from './impl';

async function run() {
  const name = getInput('name');
  const operation = getInput('operation');
  const allowMissingService = getInput('allow-missing-service') === 'true';

  if (isOperation(operation)) {
    await pauseOrResume(name, operation, allowMissingService);
  } else {
    throw new Error(
      'Invalid value provided for operation, valid values are [resume, pause]'
    );
  }
}

run();
