import React from 'react';
import {Provider} from 'react-redux';
import {createStore as reduxCreateStore, applyMiddleware} from 'redux';
import rootReducer from 'store/rootReducer';
import logger from 'redux-logger'
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';


const createStore = () => reduxCreateStore(
	rootReducer,
	applyMiddleware(promise, logger, thunk)
);

export default (props) => (
	<Provider store={createStore()}>{props.children}</Provider>
);