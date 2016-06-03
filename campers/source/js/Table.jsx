import React, { Component } from 'react';
import $ from 'jquery';

// import SortColumn from './SortColumn.jsx';

const TOP_30_DAYS_URL = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
const TOP_ALLTIME_URL = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      campers: [],
      desc: true,
      sortColumn: "recent"
    };
    this.handleSort = this.handleSort.bind(this);
  }
  componentDidMount() {
    let serverRequest = $.getJSON(TOP_30_DAYS_URL, (json) => {
      this.setState({campers: json});
    });
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  handleSort(event) {
    const { sortColumn, desc } = this.state;
    if (sortColumn === event.target.id) {
      this.setState({desc: !this.state.desc});
    }
    else {
      this.setState({
        desc: true,
        sortColumn: event.target.id
      });
    }
  }
  sort(arr) {
    const { sortColumn, desc } = this.state;
    return arr.sort((a,b) => {
      // sort by unicode strings, ignoring case
      if (sortColumn === "username") {
        a = a.username.toLowerCase(), b = b.username.toLowerCase();
        return desc ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
      }
      // or sort by numbers
      a = +a[sortColumn], b = +b[sortColumn];
      return desc ? b - a : a - b;
    });
  }
  render() {
    const { campers, desc, sortColumn } = this.state;
    const data = {
      desc,
      handleSort: this.handleSort,
      sortColumn
    };
    const rows = this.sort(campers).map(
      // The "key" is important, because Row elements are  dynamic.
      // See https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      (row,i) => <Row key={row.username} row={row} index={i}/>
    );
    return (
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th colSpan="2">
              <SortColumn id="username" data={data} >
                Username
              </SortColumn>
            </th>
            <th>
              <SortColumn id="recent" data={data} >
                Recent points
              </SortColumn>
            </th>
            <th>
              <SortColumn id="alltime" data={data} >
                Alltime points
              </SortColumn>
            </th>
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
  const { data: { handleSort, desc, sortColumn }, id, children } = props;
  const icon = desc ? "fa fa-caret-down" : "fa fa-caret-up";
  return (
    <div id={id} className="sort" onClick={handleSort} >
      {children}
      {(sortColumn === id ? <Caret icon={icon} /> : '')}
    </div>
  );
}

const Caret = (props) => (
  <i className={props.icon} aria-hidden="true"></i>
);
