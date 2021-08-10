/* eslint-disable prettier/prettier */
import * as actionTypes from '../action-types';
import { getMyTasks } from '@services/TaskService';
import { Strings } from '@res';
import { CancelToken } from 'axios';

/**
 * Set loading status
 * isLoading Boolean
 *
 * returns Object
 */
export function setTasksLoadingState(isLoading) {
    return {
        type: actionTypes.MY_TASKS_LOADING,
        isLoading,
    };
}


/**
 * Add My Tasks
 * departments Array
 * hasMore Boolean
 * page Integer
 *
 * returns Object
 */
export function addMyTasks(items, hasMore, page) {
    return {
        type: actionTypes.ADD_MY_TASKS,
        items,
        hasMore,
        page,
    };
}


/**
 * Set cancel token
 * token axios.CancelToken
 *
 * returns Object
 */
export function setTasksCancelToken(token) {
    return {
        type: actionTypes.SET_MY_TASKS_CANCEL_TOKEN,
        token,
    };
}

/**
 * Set if there is no more data
 *
 * returns Object
 */
export function hasNoMoreTasks() {
    return {
        type: actionTypes.MY_TASKS_HAS_NO_MORE,
    };
}


/**
 * Get My Tasks
 * reset Boolean
 *
 * return null
 */
export function getTasks(reset) {
    return async (dispatch, getState) => {
        if (reset) {
            let state = await getState();
            let request = state.taskData.cancelRequest;
            request.cancel(Strings.operation_canceled_by_user);
            const newRequestSource = CancelToken.source();
            await dispatch(setTasksCancelToken(newRequestSource));
            await dispatch(addMyTasks([], true, 1));
        }

        await dispatch(setTasksLoadingState(true));

        let { taskData } = await getState();
        let { page, limit, tasks, cancelRequest } = taskData;
        const { data } = await getMyTasks(limit);
        if (Array.isArray(data.tasks) && data.tasks.length) {
            const mergedTasks = mergeData(tasks, data.tasks);
            dispatch(addMyTasks(mergedTasks, true, page + 1));
        } else {
            dispatch(hasNoMoreTasks());
        }

        dispatch(setTasksLoadingState(false));
    };
}


/**
 * Merge old data with new data, after checking if id do not exist already
 * oldData Array
 * newData Array
 * return Array
 */
function mergeData(oldData, newData) {
    newData.forEach((newDataItem, newDataIndex) => {
        if (newDataItem.id) {
            let index = oldData.findIndex(data => (data.id && data.id === newDataItem.id));
            if (index === -1) {
                newDataItem['isSelected'] = false;
                if (newDataItem?.status === 'done') {
                    newDataItem['isSelected'] = true;
                }
                oldData.push(newDataItem);
            }
        }
    });
    return oldData;
}

/**
 * changeTaskStatus
 * @param {number} taskId
 * @param {boolean} isSelected
 * @returns returns state of selected task
 */
export function changeTaskStatus(taskId, isSelected) {
    return {
        type: actionTypes.CHANGE_TASK_STATUS,
        taskId: taskId,
        isSelected: isSelected,
    };
}