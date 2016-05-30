import React from 'react';
import ReactDOM from 'react-dom';

// Stylesheets
require("../sass/style.scss");

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Hello, World!</h1>
        </header>
      </div>
    );
  }
}

// Render the application
ReactDOM.render(<App/>, document.getElementById("app"));
