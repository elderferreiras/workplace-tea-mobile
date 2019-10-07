import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import TeaFeedScreen from "../screens/TeaFeedScreen";
import Colors from '../constants/Colors';
import TeaScreen from "../screens/TeaScreen";
import {createDrawerNavigator} from "react-navigation-drawer";
import {Ionicons} from '@expo/vector-icons';
import EULAScreen from "../screens/EULAScreen";

const stackConfig = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const TeaNavigator = createStackNavigator({
    Teas: TeaFeedScreen,
    Tea: TeaScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return <Ionicons name={Platform.OS === 'android' ? 'md-home' : 'ios-home'} size={23}
                             color={drawerConfig.tintColor}/>;
        }
    },
    defaultNavigationOptions: stackConfig
});

const EULANavigator = createStackNavigator(
    {
        EULA: {
            screen: EULAScreen,
        },
    },
    {
        mode: 'modal'
    }
);

const AppNavigator = createDrawerNavigator({
    Home: TeaNavigator,
    EULA: EULANavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(AppNavigator);