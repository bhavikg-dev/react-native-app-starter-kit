/* eslint-disable prettier/prettier */
import { hasSuccess, hasError } from '@services/ApiHelper';
import { appClient } from '@services/NetworkService';
import axios from 'axios';
const config = require('@config/api.json');

/**
 * getMyTasks
 * @description Get My Tasks
 */
export async function getMyTasks() {
  try {
    const url = config.tasks.getMyTasks;
    const response = await appClient.get(url);
    return hasSuccess(response.data);
  } catch (error) {
    /* istanbul ignore next */
    if (!axios.isCancel(error)) {
      return hasError(error);
    }
  }
}
