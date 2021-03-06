import React from 'react';
import ReactDOM from 'react-dom/client';

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../src/reducer/RootReducer'
import thunk from 'redux-thunk'

import './index.css';
import App from './App';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './fontAwesome/css/all.css'

const middlewares = [thunk]

const store = createStore(rootReducer, applyMiddleware(...middlewares))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
