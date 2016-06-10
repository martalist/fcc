'use strict';
import React from 'react';
import NavTabs from './NavTabs.jsx';
import { findRecipe } from '../utils/helpers.js';

class RecipeContainer extends React.Component {

  render() {
    const { recipes, updateRecipeList, deleteRecipe, params: { recipeName } } = this.props,
          currentRecipe = findRecipe(recipes, recipeName),
          recipeIndex = recipes.indexOf(currentRecipe);

    return (
      <main className="col-sm-8">
        {!!currentRecipe ? <NavTabs recipeName={recipeName} /> : null}
        <div className={"panel panel-default " + (!!currentRecipe ? "recipe-box" : "home")}>
          {React.cloneElement(this.props.children, { currentRecipe, recipeIndex, updateRecipeList, deleteRecipe})}
        </div>
      </main>
    );
  }

}

export default RecipeContainer;
