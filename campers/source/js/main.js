import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Table from './Table.jsx';

// Stylesheets
require("../sass/style.scss");


// let topCampers;
// let request = new XMLHttpRequest();
// request.open("GET", TOP_30_DAYS_URL, true);
// request.onload = function() {
//   if (this.status === 200) {
//     topCampers = [];
//   }
// };
// request.send();


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Camper leaderboard</h1>
        </header>
        <Table />
      </div>
    );
  }
}


// Render the application
ReactDOM.render(<App/>, document.getElementById("app"));
