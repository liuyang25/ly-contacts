import React from 'react';
import ReactDOM from 'react-dom';
import createRouter from './router/router'
import { Provider } from 'mobx-react'
import stores from './stores'
import * as serviceWorker from './serviceWorker';
import './utils/common'
import './normalize.css'
import './index.css';
import 'vanilla-antd-message/dist/style.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      {createRouter()}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
