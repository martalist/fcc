'use strict';
import React from 'react';
import NavTabs from './NavTabs.jsx';

class RecipeContainer extends React.Component {

  render() {
    const urlRecipe = this.props.params.recipeName;
    return (
      <main className="col-sm-8">
        <NavTabs recipeName={urlRecipe} />
        <div className="recipe-box panel panel-default">
          {React.cloneElement(this.props.children, { recipes: this.props.recipes })}
        </div>
      </main>
    );
  }

}

export default RecipeContainer;
