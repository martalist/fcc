'use strict';
import React from 'react';
import { hashHistory } from 'react-router';
import EditItem from './EditItem.jsx';
import EditList from './EditList.jsx';
import { titleToUrl } from '../utils/helpers.js';

class EditRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleSave(e) {
    e.preventDefault();
    // Fetch form element, and turn it into a recipe object
    const form = Array.prototype.slice.call(e.nativeEvent.srcElement);
    const updatedRecipe = form.reduce(
      (a,b) => {
        if (b.tagName === 'INPUT') {
          // Determine if the input is a Name, Ingredient or Method
          const inputGroup = b.name.split('-')[0];
          inputGroup === 'header' ? a.name = b.value : a[inputGroup].push(b.value);
        }
        return a;
      }, {ingredients: [], method: []}
    );
    // Redirect to the recipe view, and allow for changes to the recipe name
    hashHistory.push( '/recipes/' + titleToUrl(updatedRecipe.name) );

    // Update App state with the updated recipe
    const { handleEdit, recipeIndex } = this.props;
    handleEdit(updatedRecipe, recipeIndex);
  }
  handleCancel(e) {
    // Redirect to the recipe view
    hashHistory.push('/recipes/' + this.props.params.recipeName);
  }
  render() {
    const{ currentRecipe, recipeIndex } = this.props,
          refs = {
            ingredients: 1
          };
    return (
      <div className="container-fluid">

        <form className="col-sm-12" onSubmit={this.handleSave}>
          <div className="col-sm-12">
            <h3 className="text-center">Title</h3>
            <EditItem text={currentRecipe.name} i="Title" name="header"/>
          </div>

          <EditList heading="Ingredients" items={currentRecipe.ingredients} name="ingredients" />
          <EditList heading="Method" items={currentRecipe.method} name="method" ordered />

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
