import utils from "@utils"
const {showAlert, showConfirm} = jest.requireActual('@utils');

import {Alert} from 'react-native';

jest.mock('react-native', () => ({
  	Alert: {
  		alert: (title, description, data) => {
  			data[0].onPress();
  		}
  	},
}));

beforeEach(() => {
  	jest.clearAllMocks();
});

describe('showAlert function', () => {

	it('Should call react-native.Alert.alert with required params', () => {

		const alertSpy = jest.spyOn(Alert, 'alert');

		showAlert('description');

		const expectedParam3= [{"onPress": expect.any(Function), "text": "OK"}]
		expect(alertSpy).toHaveBeenCalledTimes(1);
		expect(alertSpy).toHaveBeenCalledWith('', 'description', expectedParam3, expect.any(Object));
	});

	it('Should invoke callback on press of OK', () => {

		const callback= jest.fn();
		showAlert('description', 'title', callback);

		expect(callback).toHaveBeenCalledTimes(1);
	});

});


describe('showConfirm function', () => {

	it('Should call react-native.Alert.alert with required params', () => {

		const alertSpy = jest.spyOn(Alert, 'alert');

		showConfirm('title', 'description');

		const expectedParam3= [{text: "No", onPress: expect.any(Function), style: 'cancel'}, {text: 'Yes', onPress: expect.any(Function)}];
		const expectedParam4= {cancelable: true};

		expect(alertSpy).toHaveBeenCalledTimes(1);
		expect(alertSpy).toHaveBeenCalledWith('title', 'description', expectedParam3, expectedParam4);
	});

	it('Should call cancelCallback on press of No', () => {

		const cancelCallback= jest.fn();
		showConfirm('title', 'description', jest.fn(), cancelCallback);

		expect(cancelCallback).toHaveBeenCalledTimes(1);
	});

	it('Should call successCallback on press of Yes', () => {

		jest.spyOn(Alert, 'alert').mockImplementation((title, description, data) => {
			return data[1].onPress();
		});

		const successCallback= jest.fn();
		showConfirm('title', 'description', successCallback);

		expect(successCallback).toHaveBeenCalledTimes(1);
	});

	it('Should use default function if successCallback function is not provided by user', () => {

		const alertSpy= jest.spyOn(Alert, 'alert').mockImplementation((title, description, data) => {
			return data[1].onPress();
		});

		const successCallback= jest.fn();
		showConfirm('title', 'description');

		const expectedParam3= [{text: "No", onPress: expect.any(Function), style: 'cancel'}, {text: 'Yes', onPress: expect.any(Function)}];
		const expectedParam4= {cancelable: true};

		expect(alertSpy).toHaveBeenCalledTimes(1);
		expect(alertSpy).toHaveBeenCalledWith('title', 'description', expectedParam3, expectedParam4);
	});
});
