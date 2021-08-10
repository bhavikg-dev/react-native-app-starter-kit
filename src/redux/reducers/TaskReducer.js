/* eslint-disable prettier/prettier */
import * as actionTypes from '../action-types';
import { CancelToken } from 'axios';

const initialState = {
    tasks: [],
    allTasksCompleted: false,
    userName: '',
    hasMore: true,
    page: 0,
    limit: 20,
    isLoading: false,
    isRefreshing: false,
    cancelRequest: CancelToken.source(),
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TASK_STATUS:
            let taskIndex = -1;
            let newTasks = [...state.tasks];
            if (newTasks.length > 0) {
                taskIndex = newTasks.findIndex((item) => +item['id'] === action.taskId);
            }
            let updatedTasks = newTasks.map((item, index) => {
                if (index === taskIndex) {
                    let isSelected = !action.isSelected;
                    let status = isSelected ? 'done' : 'pending';
                    return {...item, isSelected : isSelected, status: status};
                } else {
                    return {...item};
                }
            });
          return {
            ...state,
            tasks: updatedTasks,
          };

        case actionTypes.ADD_MY_TASKS:
            return {
                ...state,
                tasks: action.items,
                hasMore: action.hasMore,
                page: action.page,
            };

        case actionTypes.MY_TASKS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case actionTypes.SET_MY_TASKS_CANCEL_TOKEN:
            return {
                ...state,
                cancelRequest: action.token,
            };

        case actionTypes.MY_TASKS_HAS_NO_MORE:
            return {
                ...state,
                hasMore: false,
            };

        default:
            return state;
    }
}
