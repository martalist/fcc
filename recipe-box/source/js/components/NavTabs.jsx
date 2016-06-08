'use strict';
import React from 'react';
import { Link } from 'react-router';

class NavTabs extends React.Component {

  render() {
    const { recipeName } = this.props;
    console.log(recipeName);
    return (
      <ul className="nav nav-tabs">
        <li className="active">
          <Link
            to={"/recipes/" + recipeName}>
              <i className="fa fa-file-text-o" aria-hidden="true"> </i>
              View
          </Link>
        </li>
        <li>
          <Link
            to={"/recipes/" + recipeName + "/edit"}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"> </i>
              Edit
          </Link>
        </li>
      </ul>
    );
  }

}

export default NavTabs;
