import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import Router from 'react-router-dom/HashRouter';
import { Route, Switch } from 'react-router-dom';
import rootReducer from './reducers';

import Home from './components/Home';
import Sample from './components/Sample';
import OrderList from './components/OrderList';
import PostOrder from './components/PostOrder'

import './style/main.scss';

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware)
);

const store = createStore(
    rootReducer,
    middleware
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/getorders" component={OrderList}/>
                <Route path="/postorder" component={PostOrder}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
