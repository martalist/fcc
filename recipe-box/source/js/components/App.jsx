import React, { Component } from 'react';
import Header from './Header.jsx';
import RecipeListContainer from './RecipeListContainer.jsx';
import recipes from '../utils/recipes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes,
    };
    this.updateRecipeList = this.updateRecipeList.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  updateRecipeList(updatedRecipe, index) {
    const recipes = this.state.recipes.slice();
    index = index < 0 ? recipes.length : index;
    recipes[index] = updatedRecipe;
    this.setState({recipes: recipes});
  }
  deleteRecipe(index) {
    const recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    this.setState({recipes: recipes});
  }
  render() {
    const props = {
      recipes: this.state.recipes,
      updateRecipeList: this.updateRecipeList,
      deleteRecipe: this.deleteRecipe
    };
    return (
      <div>
        <Header />
        <div className="container">
          <RecipeListContainer recipes={this.state.recipes} />
          {React.cloneElement(this.props.children, props)}
        </div>
      </div>
    );
  }
}

export default App;
