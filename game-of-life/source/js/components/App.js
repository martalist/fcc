import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import BoardContainer from '../containers/BoardContainer';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <HeaderContainer /> 
        <BoardContainer />
      </div>
    );
  }
}

export default App;
