// Jest renderer setup
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

// Enzyme setup
import Enzyme from 'enzyme';
import { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { registerScreens } from '@navigation/screens';
import { Navigation } from 'react-native-navigation';

beforeEach(() => {
  	jest.clearAllMocks();
});


it('Should have a function registerScreens that calls Navigation.registerComponent 1 times to register all screens', () => {

  	const navigationSpy = jest.spyOn(Navigation, 'registerComponent');

	registerScreens();

	expect(navigationSpy).toHaveBeenCalledTimes(1);
});