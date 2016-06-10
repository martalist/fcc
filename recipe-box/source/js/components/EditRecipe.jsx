'use strict';
import React from 'react';
import { browserHistory } from 'react-router';
import EditItem from './EditItem.jsx';
import EditList from './EditList.jsx';
import { titleToUrl } from '../utils/helpers.js';

class EditRecipe extends React.Component {
  constructor(props) {
    super(props);
    const { name, ingredients, method } = this.props.currentRecipe || {
      name: "",
      ingredients: [""],
      method: [""]
    };
    this.state = {
      name,
      ingredients: ingredients.slice(),
      method: method.slice()
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleInput(e) {
    let input = e.currentTarget.value,
        [ inputGroup, index ] = e.currentTarget.name.split('-'),
        toUpdate = this.state[inputGroup].slice();
    Array.isArray(toUpdate) ? toUpdate[--index] = input : toUpdate = input;
    this.setState( this.newStateObject(inputGroup, toUpdate) );
  }
  handleDelete(e) {
    const [ inputGroup, index ] = e.currentTarget.name.split('-'),
          toUpdate = this.state[inputGroup].slice();
    toUpdate.splice(index - 1, 1);
    this.setState( this.newStateObject(inputGroup, toUpdate) );
  }
  handleAdd(e) {
    const inputGroup = e.currentTarget.name.split('-')[1],
          toUpdate = this.state[inputGroup].slice();
    toUpdate.push("");
    this.setState( this.newStateObject(inputGroup, toUpdate) );
  }
  handleSave(e) {
    e.preventDefault();

    // Update App state with the updated recipe
    const { updateRecipeList, recipeIndex } = this.props,
          name = this.state.name.trim() || "Unknown-" + (
            recipeIndex < 0 ?
            Math.random().toString(36).substr(2, 5) :
            recipeIndex
          ),
          // fetch ingredients and method, minus empty fields
          ingredients = this.state.ingredients.filter((v) => !!v),
          method = this.state.method.filter((v) => !!v);
    updateRecipeList({name, ingredients, method}, recipeIndex);

    // Redirect to the recipe view, and allow for changes to the recipe name
    browserHistory.push( '/recipes/' + titleToUrl(name) );
  }
  handleCancel(e) {
    // check if we're editing
    const url = this.props.recipeIndex >=0 ?
                '/recipes/' + this.props.params.recipeName :
                '/';
    // Redirect to the recipe view
    browserHistory.push(url);
  }
  handleDelete(e) {
    // check if we're editing
    this.props.deleteRecipe(this.props.recipeIndex);
    // Redirect to home
    browserHistory.push('/');
  }
  newStateObject(property, value) {
    const obj = {};
    obj[property] = value;
    return obj;
  }
  render() {
    const props = {
      currentRecipe: this.state,
      handleInput: this.handleInput,
      handleDelete: this.handleDelete,
      handleAdd: this.handleAdd
    };
    return (
      <div className="container-fluid">

        <form className="col-sm-12" onSubmit={this.handleSave}>
          <div className="col-sm-12">
            <h3 className="text-center">Title</h3>
            <EditItem text={props.currentRecipe.name} {...props} index="Name" inputGroup="name"/>
          </div>

          <EditList heading="Ingredients" {...props} inputGroup="ingredients" />
          <EditList heading="Method" {...props} inputGroup="method" ordered />

          <div className="save-recipe form-group container-fluid">
            <div>
              <button className="btn btn-primary" type="submit" name="Save">
                <i className="fa fa-floppy-o" aria-hidden="true"></i>
                <span>Save</span>
              </button>
              <button className="btn btn-secondary" type="button" name="Cancel" onClick={this.handleCancel} >
                <i className="fa fa-undo" aria-hidden="true"></i>
                <span>Cancel</span>
              </button>
              {this.props.recipeIndex >=0 ?
                <button className="btn btn-danger" type="button" name="Danger" onClick={this.handleDelete} >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  <span>Delete</span>
                </button> :
                null}
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default EditRecipe;
