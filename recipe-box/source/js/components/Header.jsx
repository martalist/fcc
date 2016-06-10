'use strict';
import React from 'react';
import { Link } from 'react-router';

const Brand = ({heading}) => (
  <div className="navbar-header">
    <span className="navbar-brand">{heading}</span>
  </div>
);

const HeaderRight = ({link}) => (
  <div className="container-fluid">
    <ul className="nav navbar-nav navbar-right">
      <li>
      <Link to='/add' >
        <i className="fa fa-plus-circle" aria-hidden="true"></i>
        {link}
      </Link>
      </li>
    </ul>
  </div>
);

class Header extends React.Component {

  render() {
    return (
      <header className="header container-fluid">
        {/*<nav className="navbar navbar-default"></nav>*/}
        <nav className="navbar navbar-default">
          {this.props.heading ?
            <Link to='/' >
              <Brand heading={this.props.heading} />
            </Link> :
             ''}
          {this.props.link ? <HeaderRight link={this.props.link} /> : ''}
        </nav>
      </header>
    );
  }
}

export default Header;
