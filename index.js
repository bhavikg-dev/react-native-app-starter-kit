/* eslint-disable prettier/prettier */
import { Navigation } from 'react-native-navigation';
import { registerScreens } from '@navigation/screens';
import { goToNewStack } from '@navigation/navigation';
import * as Constants from '@constants/Constants';
import { Strings, Colors, Fonts } from '@res';
import { moderateScale } from '@utils/utils';

/**
 * launchInitialScreen
 * @description Launch Initial Screen
 */
 const launchInitialScreen = async () => {
    global.activeComponent = Constants.TASKS;
    goToNewStack(Constants.HOME_ID, Constants.TASKS, {
        topBar: {
            visible: true,
            drawBehind: false,
            animate: false,
            title : {
              text: Strings.landingPageTitle,
              fontFamily: Fonts.FontMedium,
              alignment: 'center',
              fontSize: moderateScale(20),
              color: Colors.white,
            },
            leftButtons: [],
            background: {
                color: Colors.grey,
            },
        },
    });
 };

Navigation.events().registerAppLaunchedListener(() => {
  registerScreens();
  launchInitialScreen();
});






