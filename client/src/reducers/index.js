import { combineReducers } from 'redux';
// import sampleReducer from './sampleReducer';
import getOrderReducer from './getOrderReducer'
import postOrderReducer from './postOrderReducer'
const rootReducer = combineReducers({
    // sample: sampleReducer,
    getOrder:getOrderReducer,
    postOrder:postOrderReducer
});

export default rootReducer;
