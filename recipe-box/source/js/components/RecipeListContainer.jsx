'use strict';
import React from 'react';
import Header from './Header.jsx';
import RecipeList from './RecipeList.jsx';

class RecipeListContainer extends React.Component {

  render() {
    return (
      <aside className="col-sm-4">
        <Header heading="Recipes" link="Add a recipe"/>
        <RecipeList recipes={this.props.recipes}/>
      </aside>
    );
  }

}

export default RecipeListContainer;
