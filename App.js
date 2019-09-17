import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import teasReducer from './store/reducers/teas';
import teaReducer from './store/reducers/tea';
import Home from "./components/Home";
import Amplify from 'aws-amplify';
import amplify from './aws-exports';

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
    return (
        <Provider store={store}>
           <Home/>
        </Provider>
    );
}