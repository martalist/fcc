'use strict';
import React from 'react';

const Brand = ({heading}) => (
  <div className="navbar-header">
    <span className="navbar-brand">{heading}</span>
  </div>
);

const HeaderRight = ({link}) => (
  <div className="container-fluid">
    <ul className="nav navbar-nav navbar-right">
      <li><a href="#"><i className="fa fa-plus-circle" aria-hidden="true"></i> {link}</a></li>
    </ul>
  </div>
);

class Header extends React.Component {

  render() {
    return (
      <header className="header container-fluid">
        {/*<nav className="navbar navbar-default"></nav>*/}
        <nav className="navbar navbar-default">
          {this.props.heading ? <Brand heading={this.props.heading} /> : ''}
          {this.props.link ? <HeaderRight link={this.props.link} /> : ''}
        </nav>
      </header>
    );
  }
}

export default Header;
