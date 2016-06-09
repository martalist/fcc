'use strict';
import React from 'react';

const deleteButton = (
  <span className="input-group-btn">
    <button className="btn btn-danger" type="button">
      <i className="fa fa-trash" aria-hidden="true"></i>
    </button>
  </span>
);

class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    this.setState({text: e.target.value});
  }
  render() {
    return (
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon">{this.props.i}</span>
          <input
            type="text"
            name={this.props.name + '-' + this.props.i}
            className="form-control"
            value={this.state.text}
            onChange={this.handleInputChange}/>
          {this.props.deletable ? deleteButton : null}
        </div>
      </div>
    );
  }

}

export default EditItem;
