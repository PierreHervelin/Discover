import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);