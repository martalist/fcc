'use strict';
import React from 'react';
import { IndexLink } from 'react-router';

const Tab = ({recipeName, edit, icon, children}) => {
  const url = "/recipes/" + recipeName;
  return (
    <li>
      <IndexLink
        to={edit ? url + "/edit" : url}
        activeClassName="active" >
          {children}
      </IndexLink>
    </li>
  );
};

class NavTabs extends React.Component {
  render() {
    const { recipeName } = this.props;
    return (
      <ul className="nav nav-tabs">
        <Tab
          recipeName={recipeName} >
            <i className="fa fa-file-text-o" aria-hidden="true"> </i>
            View
        </Tab>
        <Tab
          recipeName={recipeName}
          edit >
            <i className="fa fa-pencil-square-o" aria-hidden="true"> </i>
            Edit
        </Tab>
        {/*<li>
          <Link
            to={"/recipes/" + recipeName + "/edit"}
            activeClassName="active" >
              <i className="fa fa-pencil-square-o" aria-hidden="true"> </i>
              Edit
          </Link>
        </li>*/}
      </ul>
    );
  }

}

export default NavTabs;
