import React, { Component } from 'react';
import $ from 'jquery';

// import SortColumn from './SortColumn.jsx';

const TOP_30_DAYS_URL = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
const TOP_ALLTIME_URL = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      topCampers30Days: [],
      topCampersAllTime: [],
      desc: true
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
  handleSort() {
    this.setState({desc: !this.state.desc});
  }
  render() {
    const campers = this.state.topCampers30Days;
    const { desc } = this.state;
    let rows = campers.sort(
      (a,b) => (desc ? +b.recent - +a.recent : +a.recent - +b.recent)
    ).map(
      // The "key" is important, because Row elements are dynamic.
      // See https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      (row,i) => <Row key={row.username} row={row} index={i}/>
    );
    return (
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th></th>
            <th>Username</th>
            <th>
              <SortColumn
                handleSort={this.handleSort.bind(this)}
                desc={desc}
              >
                Recent points
              </SortColumn>
            </th>
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

// Stateless Components
function Row(props) {
  const { row: { img, username, recent, alltime }, index } = props;
  return (
    <tr>
      <td>{index + 1}</td>
      <td><img src={img} alt={username} width="50px" height="50px" /></td>
      <td>
        <a href={"https://github.com/" + username} target="blank">{username}</a>
      </td>
      <td>{recent}</td>
      <td>{alltime}</td>
    </tr>
  );
}

function SortColumn(props) {
  const { handleSort, desc, children } = props;
  const icon = desc ? "fa fa-caret-down" : "fa fa-caret-up";
  return (
    <div
      className="sort"
      onClick={handleSort}
    >
      {children}
      <i className={icon} aria-hidden="true"></i>
    </div>
  );
}
