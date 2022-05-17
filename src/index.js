import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
// import allReducers from './components/reducers/reducer';
import App from './App';
import reportWebVitals from './reportWebVitals';

const defaultState = {
  post: false,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return {...state, post: true};
    default:
      return state;
  }
};
const store = createStore(reducer);
// let store = createStore(allReducers);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
