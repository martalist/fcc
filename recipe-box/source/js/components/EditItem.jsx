'use strict';
import React from 'react';

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
        {/*<label className="control-label">Input addons</label>*/}
        <div className="input-group">
          <span className="input-group-addon">{this.props.i + 1}</span>
          <input
            type="text"
            className="form-control"
            value={this.state.text}
            onChange={this.handleInputChange}/>
          <span className="input-group-btn">
            <button className="btn btn-danger" type="button">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </span>
        </div>
      </div>
    );
  }

}

export default EditItem;
