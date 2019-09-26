import { Platform } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import TeaFeedScreen from "../screens/TeaFeedScreen";
import Colors from '../constants/Colors';
import TeaScreen from "../screens/TeaScreen";

const stackConfig = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
};

const Navigator = createStackNavigator({
    Teas: TeaFeedScreen,
    Tea: TeaScreen
}, stackConfig);

export default createAppContainer(Navigator);