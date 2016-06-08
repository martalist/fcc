'use strict';
import React from 'react';
import EditList from './EditList.jsx';
import { titleToUrl } from '../utils/recipes.js';

class EditRecipe extends React.Component {

  render() {
    const urlRecipe = this.props.params.recipeName;
    const currentRecipe = this.props.recipes.reduce(
      (a,b) => titleToUrl(b.name) === urlRecipe ? b : a,
      null
    );
    return (
      <div className="container-fluid">
        <header className="text-center">
          <h1>{"Edit " + currentRecipe.name}</h1>
        </header>

        <form className="col-sm-12">
          <EditList heading="Ingredients" items={currentRecipe.ingredients} />
          <EditList heading="Method" items={currentRecipe.method} ordered />
        </form>
      </div>
    );
  }

}

export default EditRecipe;
