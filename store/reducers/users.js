import {SET_EULA, SAVE_EULA, CHECKING_EULA } from "../actions/actionTypes";

const initialState = {
    checked: false,
    agreed: true,
    checking: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECKING_EULA:
            return {...state, checking: true, checked: true};
        case SAVE_EULA:
            return {...state, agreed: action.agreed, checking: false};
        case SET_EULA:
            return {...state, agreed: action.agreed, checking: false};
        default:
            return state;
    }
};

export default reducer;