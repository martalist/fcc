import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

// Components
import App from './components/App.jsx';

// Stylesheets
require("../sass/style.scss");

const app = document.getElementById("app");

// Render the application
render((
  <Router history={hashHistory}>
    <Route path="/" component ={App} />
  </Router>
), app);
