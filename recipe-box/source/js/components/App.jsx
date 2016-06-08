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
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <RecipeListContainer recipes={this.state.recipes}/>
          {React.cloneElement(this.props.children, { recipes: this.state.recipes })}
        </div>
      </div>
    );
  }
}

export default App;
