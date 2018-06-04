import {GET_PENDING,GET_RESOLVED,GET_REJECTED} from "../actions/getOrders";
import {LOADING,SUCCESS,NOT_STARTED,ERROR} from "./statusTypes"
const initialState = {
    orders: [],
    status: NOT_STARTED,
    error: ""
};

const getOrderReducer = function (state = initialState, action) {
    const { type,payload } = action;

    switch (type) {
        case GET_PENDING: {
            return { ...state, status: LOADING };
        }

        case GET_RESOLVED: {
            return { ...state, orders: payload, status: SUCCESS };
        }

        case GET_REJECTED: {
            return { ...state, error: payload, status: ERROR };
        }

        default: {
            return state;
        }
    }
};

export default getOrderReducer;