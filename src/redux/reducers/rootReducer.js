/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import TaskReducer from './TaskReducer';

const rootReducer = combineReducers({
    taskData: TaskReducer,
});

export default rootReducer;
