'use strict';
import React from 'react';
import { hashHistory } from 'react-router';
import EditItem from './EditItem.jsx';
import EditList from './EditList.jsx';
import { titleToUrl } from '../utils/helpers.js';

class EditRecipe extends React.Component {
  constructor(props) {
    super(props);
    const { name, ingredients, method } = this.props.currentRecipe;
    this.state = {
      name,
      ingredients: ingredients.slice(),
      method: method.slice()
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleInput(e) {
    let input = e.nativeEvent.target.value,
        [ inputGroup, index ] = e.nativeEvent.target.name.split('-'),
        toUpdate = this.state[inputGroup];
    if (Array.isArray(toUpdate)) {
      toUpdate[--index] = input;
    }
    else {
      toUpdate = input;
    }
    let newState = {};
    newState[inputGroup] = toUpdate;
    this.setState(newState);
  }
  handleSave(e) {
    e.preventDefault();

    // Update App state with the updated recipe
    const { name, ingredients, method } = this.state;
    const { updateRecipeList, recipeIndex } = this.props;
    updateRecipeList({name, ingredients, method}, recipeIndex);

    // Redirect to the recipe view, and allow for changes to the recipe name
    hashHistory.push( '/recipes/' + titleToUrl(name) );
  }
  handleCancel(e) {
    const { name, ingredients, method } = this.props.currentRecipe;
    this.setState({
      name,
      ingredients: ingredients.slice(),
      method: method.slice()
    });
    // Redirect to the recipe view
    hashHistory.push('/recipes/' + this.props.params.recipeName);
  }
  render() {
    const props = {
      currentRecipe: this.state,
      handleInput: this.handleInput
    };
    return (
      <div className="container-fluid">

        <form className="col-sm-12" onSubmit={this.handleSave}>
          <div className="col-sm-12">
            <h3 className="text-center">Title</h3>
            <EditItem text={props.currentRecipe.name} {...props} index="Title" inputGroup="name"/>
          </div>

          <EditList heading="Ingredients" {...props} inputGroup="ingredients" />
          <EditList heading="Method" {...props} inputGroup="method" ordered />

          <div class="form-group">
            <div class="col-sm-6 col-sm-offset-3">
              <button className="btn btn-primary" type="submit" name="Save">
                Save
              </button>
              <button className="btn btn-default" type="button" name="Cancel" onClick={this.handleCancel} >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default EditRecipe;
