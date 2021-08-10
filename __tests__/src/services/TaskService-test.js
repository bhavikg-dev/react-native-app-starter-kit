// Jest renderer setup
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import TaskService from '@services/TaskService'
const {getMyTasks} = jest.requireActual('@services/TaskService');
import { appClient } from '@services/NetworkService';
import config from '@config/api';
import * as ApiHelper from '@services/ApiHelper';

beforeEach(() => {
  	jest.clearAllMocks();
});

describe('getMyTasks function', () => {

	it('Should call appClient.get with correct url as param', async () => {

		const appClientSpy = jest.spyOn(appClient, 'get');

		await getMyTasks();

		expect(appClientSpy).toHaveBeenCalledTimes(1);
		expect(appClientSpy).toHaveBeenCalledWith(config.tasks.getMyTasks);
	});


	it('Should call ApiHelper.hasSuccess on success', async () => {

		const apiHelperSpy = jest.spyOn(ApiHelper, 'hasSuccess');

		await getMyTasks();

		expect(apiHelperSpy).toHaveBeenCalledTimes(1);
		expect(apiHelperSpy).toHaveBeenCalledWith({"all_tasks_completed": false,
		"tasks": [
		  {
			"due_date": "9:00AM 12-1-2019",
			"id": "1",
			"name": "Task 1 ",
			"status": "done",
		  },
		  {
			"due_date": "11:00AM 12-1-2019",
			"id": "2",
			"name": "Task 2 ",
			"status": "in-progress",
		  },
		  {
			"due_date": "22:00AM 12-1-2019",
			"id": "3",
			"name": "Task 3 ",
			"status": "pending",
		  },
		],
		"username": "User"});
	});


	it('Should return some data and error as false if it was success', async () => {

		const {data, error}= await getMyTasks();

		expect(data).toEqual({ "all_tasks_completed": false,
		"tasks": [
		  {
			"due_date": "9:00AM 12-1-2019",
			"id": "1",
			"name": "Task 1 ",
			"status": "done",
		  },
		  {
			"due_date": "11:00AM 12-1-2019",
			"id": "2",
			"name": "Task 2 ",
			"status": "in-progress",
		  },
		  {
			"due_date": "22:00AM 12-1-2019",
			"id": "3",
			"name": "Task 3 ",
			"status": "pending",
		  },
		],
		"username": "User", });
		expect(error).toEqual(false);
	});


	it('Should call ApiHelper.hasError on failure', async () => {

		jest.spyOn(appClient, 'get').mockImplementation(() => {
			return Promise.reject('api failed')
		});
		const apiHelperSpy = jest.spyOn(ApiHelper, 'hasError');

		await getMyTasks();

		expect(apiHelperSpy).toHaveBeenCalledTimes(1);
		expect(apiHelperSpy).toHaveBeenCalledWith('api failed');
	});


	it('Should return data as null and error if it failed', async () => {

		jest.spyOn(appClient, 'get').mockImplementation(() => {
			return Promise.reject('api failed')
		});

		const {data, error}= await getMyTasks();

		expect(data).toEqual(null);
		expect(error).toEqual('Something went wrong.');
	});
});
