import React, { Component } from 'react';
import Header from './Header';
import BoardContainer from '../containers/BoardContainer';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Header /> 
        <BoardContainer />
      </div>
    );
  }
}

export default App;
