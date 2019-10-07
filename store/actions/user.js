import * as actionTypes from "./actionTypes";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import {getAgreedToEula} from "../../graphql/queries";
import {CHECKING_EULA} from "./actionTypes";
import { NavigationActions } from 'react-navigation';
import {DONE_CHECKING_EULA} from "./actionTypes";

const uuidv4 = require('uuid/v4');

export const setEULA = (agreed) => {
    return {
        type: actionTypes.SET_EULA,
        agreed
    };
};

export const saveEULA = () => {
    return {
        type: actionTypes.SAVE_EULA,
        agreed: true
    }
};

export const checkingEULA = () => {
    return {
        type: CHECKING_EULA
    }
};
export const doneCheckingEULA = () => {
    return {
        type: DONE_CHECKING_EULA
    }
};

export const checkUserEULA = (deviceId) => {
    return (dispatch) => {
        dispatch(checkingEULA());
        API.graphql(graphqlOperation(getAgreedToEula, {identifier: deviceId})).then(res => {
            if (res.data.getAgreedToEULA && res.data.getAgreedToEULA.identifier) {
                dispatch(setEULA(true));
            } else {
                dispatch(setEULA(false));
            }
        });
    }
};

export const persistEULA = (deviceId) => {
    return (dispatch) => {
        dispatch(checkingEULA());

        API.graphql(graphqlOperation(mutations.createAgreedToEula, {
            input: {
                id: uuidv4(),
                identifier: deviceId
            }
        })).then(res => {
            dispatch(saveEULA());
            dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        });
    }
};
