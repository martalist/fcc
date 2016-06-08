import React, { Component } from 'react';
import { Link } from 'react-router';

import { titleToUrl } from '../utils/recipes.js';

class RecipeList extends Component {
  render() {
    const recipeList = this.props.recipes.sort(
      (a,b) => a.name > b.name
    ).map((recipe) => (
      <RecipeLink key={recipe.name} recipe={recipe} />
    ));
    return (
      <div className="list-group">
        {recipeList}
      </div>
    );
  }
}

const RecipeLink = ({recipe}) => {
  const url = "/recipes/" + titleToUrl(recipe.name);
  return (
    <Link
      to={url}
      className="list-group-item">
        {recipe.name}
    </Link>
  );
};

export default RecipeList;
