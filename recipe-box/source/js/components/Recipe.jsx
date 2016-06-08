'use strict';
import React from 'react';
import List from './List.jsx';

class Recipe extends React.Component {

  render() {
    const{ currentRecipe, recipeIndex } = this.props;
    return (
      <div className="container-fluid">
        <header className="text-center">
          <h1>{currentRecipe.name}</h1>
        </header>

        <div className="col-sm-12">
          <List heading="Ingredients" items={currentRecipe.ingredients} />
          <List heading="Method" items={currentRecipe.method} ordered />
        </div>
      </div>
    );
  }

}

export default Recipe;
