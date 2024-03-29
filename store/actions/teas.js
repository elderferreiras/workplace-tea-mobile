import * as actionTypes from '../actions/actionTypes';
import {getWorkplaceId} from "../../helpers/utils";
import {API, graphqlOperation} from "aws-amplify";
import {getBlockedIPs, getWorkplace} from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import axios from "axios";
import * as voting from './voting';

const uuidv4 = require('uuid/v4');
import {AsyncStorage} from 'react-native';

export const fetchTeasStart = (init) => {
    return {
        type: actionTypes.FETCH_TEAS_START,
        init: init
    };
};

export const fetchTeasSuccess = (teas, next, init) => {
    return {
        type: actionTypes.FETCH_TEAS_SUCCESS,
        teas: teas,
        next: next,
        init: init
    };
};

export const fetchTeasFail = (error) => {
    return {
        type: actionTypes.FETCH_TEAS_FAIL,
        error: error
    };
};

export const fetchMoreTeas = () => {
    return {
        type: actionTypes.FETCH_MORE_TEAS
    };
};

export const fetchTeas = (init) => {
    return (dispatch, getState) => {
        if (!getState().teasReducer.teas.length) {
            dispatch(fetchTeasStart(init));
        } else {
            dispatch(fetchMoreTeas());
        }

        let variables = {id: getWorkplaceId(), sortDirection: 'DESC', limit: 10};

        if (getState().teasReducer.next && !init) {
            variables.nextToken = getState().teasReducer.next;
        }

        API.graphql(graphqlOperation(getWorkplace, variables)).then(res => {
            const teas = res.data.getWorkplace.teas;
            dispatch(fetchTeasSuccess(teas.items, teas.nextToken, init));
        }).catch(err => {
            dispatch(fetchTeasFail(err));
        });
    }
};

export const createTeaSuccess = (tea) => {
    return {
        type: actionTypes.CREATE_TEA_SUCCESS,
        tea: tea
    }
};

export const createTeaError = (err) => {
    return {
        type: actionTypes.CREATE_TEA_ERROR,
        error: err
    }
};

export const createTeaStart = () => {
    return {
        type: actionTypes.CREATE_TEA_START
    }
};

export const submitTea = (content, ip = null) => {
    return (dispatch) => {
        dispatch(createTeaStart());
        const data = {
            input: {
                content: content,
                teaWorkplaceId: getWorkplaceId()
            }
        };

        if (ip) {
            data.input.ip = ip;
        }

        API.graphql(graphqlOperation(mutations.createTea, data)).then(res => {
            //postTweet(content, res.data.createTea.id);
            dispatch(createTeaSuccess(res.data.createTea));
        }).catch(err => {
            dispatch(createTeaError(err));
        });
    };
};

export const blockedIP = () => {
    return {
        type: actionTypes.BLOCKED_IP
    }
};

export const isIPBlocked = () => {
    return (dispatch) => {
        axios.get('https://api.ipify.org/?format=json').then(res => {
            API.graphql(graphqlOperation(getBlockedIPs, {ip: res.data.ip})).then(res => {
                if (res.data.getBlockedIPs && res.data.getBlockedIPs.id) {
                    dispatch(blockedIP());
                }
            });
        });
    };
};

export const blockIP = (ip) => {
    return (dispatch) => {
        API.graphql(graphqlOperation(mutations.createBlockedIPs, {
            input: {
                id: uuidv4(),
                ip: ip
            }
        })).then(res => {
            dispatch(blockedIP());
        });
    };
};

export const updateVote = (id, tea) => {
    return {
        type: actionTypes.UPDATE_VOTE,
        id: id,
        tea: tea
    };
};

export const countUpVote = (id, countUp, countDown) => {
    return (dispatch) => {
        const key = `CognitoIdentityServiceProvider#${id}`;

        AsyncStorage.getItem(key).then((vote) => {
            if (vote === voting.UP) {
                AsyncStorage.removeItem(key, () => {
                    countUp--;
                    persistVote(countUp, countDown, id, dispatch);
                });
            } else if (vote === voting.DOWN) {
                AsyncStorage.setItem(key, voting.UP, () => {
                    countUp++;
                    countDown--;
                    persistVote(countUp, countDown, id, dispatch);
                });
            } else {
                AsyncStorage.setItem(key, voting.UP, () => {
                    countUp++;
                    persistVote(countUp, countDown, id, dispatch);
                });
            }
        });
    };
};

const persistVote = (countUp, countDown, id, dispatch) => {
    API.graphql(graphqlOperation(mutations.updateTea, {
        input: {
            id: id,
            up: countUp < 0 ? 0 : countUp,
            down: countDown < 0 ? 0 : countDown
        }
    })).then(res => {
        dispatch(updateVote(id, res.data.updateTea));
    });
};

export const countDownVote = (id, countUp, countDown) => {
    return (dispatch) => {
        const key = `CognitoIdentityServiceProvider#${id}`;
        AsyncStorage.getItem(key).then((vote) => {
            if (vote === voting.DOWN) {
                AsyncStorage.removeItem(key, () => {
                    countDown--;
                    persistVote(countUp, countDown, id, dispatch);
                });
            } else if (vote === voting.UP) {
                AsyncStorage.setItem(key, voting.DOWN, () => {
                    countUp--;
                    countDown++;
                    persistVote(countUp, countDown, id, dispatch);
                });
            } else {
                AsyncStorage.setItem(key, voting.DOWN, () => {
                    countDown++;
                    persistVote(countUp, countDown, id, dispatch);
                });
            }
        });
    };
};

export const loadFakeTea = (tea) => {
    return {
        tea: tea,
        type: actionTypes.LOAD_FAKE_TEA
    }
};

export const loadInappropriateTea = (content) => {
    return (dispatch) => {
        dispatch(loadFakeTea({
                id: uuidv4(),
                content: content,
                createdAt: '2019-09-06T02:11:16.789Z',
                up: 0,
                down: 0,
                ip: null,
                comments: {
                    items: []
                }
            }
        ));
    }
};
