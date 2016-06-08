'use strict';
import React from 'react';

class Home extends React.Component {

  render() {
    return (
      <main className="home-container col-sm-8">
        <div className="home panel panel-default">
          <div className="container-fluid">
            <header className="text-center">
              <h1>Welcome</h1>
            </header>

            <div className="col-sm-12 text-center">
              <p>Select a recipe from the menu, or add a new recipe.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

}

export default Home;
