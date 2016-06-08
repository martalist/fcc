import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Components
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import RecipeContainer from './components/RecipeContainer.jsx';
import Recipe from './components/Recipe.jsx';
import EditRecipe from './components/EditRecipe.jsx';

// Stylesheets
require("../sass/style.scss");

const app = document.getElementById("app");

// Render the application
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/recipes/:recipeName" component={RecipeContainer}>
        <IndexRoute component={Recipe} />
        <Route path="/recipes/:recipeName/edit" component={EditRecipe}></Route>
      </Route>
    </Route>
  </Router>
), app);
