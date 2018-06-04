import {POST_PENDING,POST_RESOLVED,POST_REJECTED} from "../actions/postOrder";
import {LOADING,SUCCESS,NOT_STARTED,ERROR} from "./statusTypes"
const initialState = {
    order: {},
    status: NOT_STARTED,
    error: {}
};

const postOrderReducer = function (state = initialState, action) {
    const { type,payload } = action;

    switch (type) {
        case POST_PENDING: {
            return { ...state, status: LOADING };
        }

        case POST_RESOLVED: {
            return { ...state, order: payload, status: SUCCESS };
        }

        case POST_REJECTED: {
            return { ...state, error: payload, status: ERROR };
        }

        default: {
            return state;
        }
    }
};

export default postOrderReducer;