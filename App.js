import React, {useState} from 'react';
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
import axios from "axios";
import {validate} from "./utility/utility";

Amplify.configure(amplify);

const rootReducer = combineReducers({
    teasReducer: teasReducer,
    teaReducer: teaReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default function App() {
    const [openModal, setOpenModal] = useState(false);

    const cancel = () => {
        setOpenModal(false);
    };

    const open = () => {
        setOpenModal(true);
    };

    return (
        <Provider store={store}>
            <Header title="Home"/>
            <TeaFeedScreen/>
            <NewTeaButton open={open}/>
            <NewTeaScreen visible={openModal} cancel={cancel}/>
        </Provider>
    );
}