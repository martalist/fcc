import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// Stylesheets
require("../sass/style.scss");

const TOP_30_DAYS_URL = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
const TOP_ALLTIME_URL = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";

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
  constructor() {
    super();
    this.state = {
      topCampers30Days: [],
      topCampersAllTime: []
    }
    $.getJSON(TOP_30_DAYS_URL, (json) => {
      this.topCampers30Days = json;
      this.setState({topCampers30Days: json});
    });
  }
  render() {
    const campers = this.state.topCampers30Days;
    return (
      <div className="container">
        <header>
          <h1>Hello, World!</h1>
        </header>
        <Table rows={campers} />
      </div>
    );
  }
}

class Table extends React.Component {
  render() {
    let rows = this.props.rows.sort( (a,b) => +b.recent - +a.recent )
    .map((row, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td><img src={row.img} alt={row.username} width="50px" height="50px" /></td>
          <td>{row.username}</td>
          <td>{row.recent}</td>
          <td>{row.alltime}</td>
        </tr>
      )
    });
    return (
      <table>
        {rows}
      </table>
    )
  }
}

// Render the application
ReactDOM.render(<App/>, document.getElementById("app"));
