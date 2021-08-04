import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import reportWebVitals from './reportWebVitals';

let debugMode = false;
let store = null;

if (process.env.REACT_APP_ENV !== 'prod') {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  debugMode = true;
} else {
  store = createStore(reducer, applyMiddleware(thunk));
}

const injectGoogleAnalytics = (gaId) => {
  if (typeof window == 'undefined') {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', gaId);
}

const app = (
  <Fragment>
    <Helmet>
      <title>Mortgage Calculator ++</title>
    </Helmet>
    {process.env.REACT_APP_GA_ID ? (
      <Helmet>
        <script>{injectGoogleAnalytics(process.env.REACT_APP_GA_ID)}</script>
        <script async src={"https://www.googletagmanager.com/gtag/js?id=" + process.env.REACT_APP_GA_ID}></script>
      </Helmet>
    ) : null}
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <App debugMode={debugMode} />
        </Router>
      </React.StrictMode>
    </Provider>
  </Fragment>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();