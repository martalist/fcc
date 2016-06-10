import React, { Component } from 'react';
import Header from './Header.jsx';
import RecipeListContainer from './RecipeListContainer.jsx';
import recipes from '../utils/recipes';
import { storageAvailable } from '../utils/helpers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes,
      localStorage: false
    };
    this.updateRecipeList = this.updateRecipeList.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  componentDidMount() {
    if (storageAvailable('localStorage')) {
      this.setState({localStorage: true}, () => {
        const localData = localStorage.getItem('fccRecipeList'),
              recipes = JSON.parse(localData) || this.state.recipes;
        this.updateStateStorage({recipes});
      });
    }
  }
  updateRecipeList(updatedRecipe, index) {
    const recipes = this.state.recipes.slice();
    index = index < 0 ? recipes.length : index;
    recipes[index] = updatedRecipe;
    this.updateStateStorage({recipes});
  }
  deleteRecipe(index) {
    const recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    this.updateStateStorage({recipes});
  }
  updateStateStorage(obj) {
    this.setState(obj);
    if (this.state.localStorage) {
      localStorage.setItem('fccRecipeList', JSON.stringify(obj.recipes));
    }
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
