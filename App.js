import React, {useState, useRef} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import teasReducer from './store/reducers/teas';
import teaReducer from './store/reducers/tea';
import TeaFeedScreen from "./screens/TeaFeedScreen";
import Amplify from 'aws-amplify';
import amplify from './aws-exports';
import Header from "./components/Header";
import NewTeaButton from "./components/NewTeaButton";
import NewTeaScreen from "./screens/NewTeaScreen";
import * as Font from 'expo-font';
import { AppLoading } from "expo";

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
    })
};

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const textInputRef = useRef(null);

    const cancel = () => {
        setOpenModal(false);
        textInputRef.current.blur();
    };

    const open = () => {
        setOpenModal(true);
    };

    if(!dataLoaded) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setDataLoaded(true)}
            onError={(err) => console.log(err)}
        />;
    }

    return (
        <Provider store={store}>
            <Header title="Workplace Tea"/>
            <TeaFeedScreen/>
            <NewTeaButton open={open}/>
            <NewTeaScreen visible={openModal} cancel={cancel} inputRef={textInputRef}/>
        </Provider>
    );
}