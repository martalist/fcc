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
  render() {
    return (
      <div className="container">
        <header>
          <h1>Hello, World!</h1>
        </header>
        <Table />
      </div>
    );
  }
}

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      topCampers30Days: [],
      topCampersAllTime: []
    };
  }
  componentDidMount() {
    let serverRequest = $.getJSON(TOP_30_DAYS_URL, (json) => {
      this.setState({topCampers30Days: json});
    });
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  render() {
    const campers = this.state.topCampers30Days;
    let rows = campers.sort(
      (a,b) => +b.recent - +a.recent
    ).map(
      (row,i) => <Row row={row} index={i}/>
    );
    return (
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th></th>
            <th>Username</th>
            <th>Recent points</th>
            <th>Alltime points</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class Row extends React.Component {
  render () {
    const { row: { img, username, recent, alltime }, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td><img src={img} alt={username} width="50px" height="50px" /></td>
        <td>{username}</td>
        <td>{recent}</td>
        <td>{alltime}</td>
      </tr>
    );
  }
}

// Render the application
ReactDOM.render(<App/>, document.getElementById("app"));
