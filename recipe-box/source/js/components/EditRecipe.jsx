'use strict';
import React from 'react';
import EditItem from './EditItem.jsx';
import EditList from './EditList.jsx';

class EditRecipe extends React.Component {
  render() {
    const{ currentRecipe, recipeIndex } = this.props;
    return (
      <div className="container-fluid">

        <form className="col-sm-12">
          <div className="col-sm-12">
            <h3 className="text-center">Title</h3>
            <EditItem text={currentRecipe.name} i="Title" />
          </div>

          <EditList heading="Ingredients" items={currentRecipe.ingredients} />
          <EditList heading="Method" items={currentRecipe.method} ordered />

          <div class="form-group">
            <div class="col-sm-6 col-sm-offset-3">
              <button className="btn btn-primary" type="submit" name="Save">
                Save
              </button>
              <button className="btn btn-default" type="button" name="Cancel">
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
