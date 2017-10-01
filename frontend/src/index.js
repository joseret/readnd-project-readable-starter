import thunkMiddleware from 'redux-thunk'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'

import { fetchCategories } from './actions/actions'
import reducer from './reducers'
import {Provider} from 'react-redux'

const loggerMiddleware = createLogger()


const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//&& window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
 )


 store.dispatch(fetchCategories())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

registerServiceWorker();
