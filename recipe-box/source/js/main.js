import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Components
import App from './components/App.jsx';
import EditRecipe from './components/EditRecipe.jsx';
import Home from './components/Home.jsx';
import Recipe from './components/Recipe.jsx';
import RecipeContainer from './components/RecipeContainer.jsx';

// Stylesheets
require("../sass/style.scss");

const app = document.getElementById("app");

// Render the application
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/recipes/:recipeName" component={RecipeContainer}>
        <IndexRoute component={Recipe} />
        <Route path="/recipes/:recipeName/edit" component={EditRecipe}></Route>
        <Route path="/add" component={EditRecipe} ></Route>
      </Route>
    </Route>
  </Router>
), app);
