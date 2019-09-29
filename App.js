import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import teasReducer from './store/reducers/teas';
import teaReducer from './store/reducers/tea';
import Amplify from 'aws-amplify';
import amplify from './aws-exports';
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import Navigator from "./navigation/navigator";

Amplify.configure(amplify);

const rootReducer = combineReducers({
    teasReducer: teasReducer,
    teaReducer: teaReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans-semi-bold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
    })
};

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);

    if(!dataLoaded) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setDataLoaded(true)}
            onError={(err) => console.log(err)}
        />;
    }

    return (
        <Provider store={store}>
            <Navigator/>
        </Provider>
    );
}