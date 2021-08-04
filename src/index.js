import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import reportWebVitals from './reportWebVitals';

let debugMode = false;
let store = null;

if (process.env.REACT_APP_ENV === 'dev') {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  debugMode = true;
} else if (process.env.REACT_APP_ENV === 'prod') {
  store = createStore(reducer, applyMiddleware(thunk));
} else if (process.env.REACT_APP_ENV === 'test') {
  store = createStore(reducer, applyMiddleware(thunk));
} else alert('Not appropriate ENV value, should be "dev" or "prod"!');

if (process.env.REACT_APP_GA_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_ID);
}

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App debugMode={debugMode} />
      </Router>
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();