'use strict';
import React from 'react';
import NavTabs from './NavTabs.jsx';
import { findRecipe } from '../utils/helpers.js';

class RecipeContainer extends React.Component {

  render() {
    const { recipes, updateRecipeList, params: { recipeName } } = this.props,
          currentRecipe = findRecipe(recipes, recipeName),
          recipeIndex = recipes.indexOf(currentRecipe);

    return (
      <main className="col-sm-8">
        <NavTabs recipeName={recipeName} />
        <div className="recipe-box panel panel-default">
          {React.cloneElement(this.props.children, { currentRecipe, recipeIndex, updateRecipeList})}
        </div>
      </main>
    );
  }

}

export default RecipeContainer;
