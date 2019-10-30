import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.scss';
import './index.css';
import './index.less';
import './utils/axiosMiddleware';
// import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);


serviceWorker.unregister();
