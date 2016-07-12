import d3 from 'd3';
import tooltip from 'd3-tip';

// Stylesheets
require("../sass/style.scss");

const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const margin = { top: 10, bottom: 12, left: 40, right: 20 }
    , width = 960 - margin.left - margin.right
    , height = 500 - margin.top - margin.bottom;

const x = d3.time.scale()
    .range([margin.left, width - margin.right]);

const y = d3.scale.linear()
    .range([height - margin.bottom, 0]);

const canvas = d3.select('#app').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickFormat(d3.time.format("%Y"))
    .ticks(15);

const yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10);

// fetch data
d3.json(URL, (err, json) => {
  if (err) console.error(err);

  // parse data
  const data = json.data.map((d) => [ new Date(d[0]), +d[1] ]);
  const { from_date, to_date } = json;

  // tooltip
  const tip = tooltip().html((d) => (
    `<div class="d3-tip">
      <h4>$${numberWithCommas(d[1])} billion</h4>
      <p>${d[0].getFullYear()} - ${MONTHS[d[0].getMonth()]}</p>
    </div>`
  ));
  canvas.call(tip);

  x.domain( [from_date, to_date].map( (d) => new Date(d) ));
  y.domain([0, d3.max(data, (d) => d[1] )]);

  // data
  let bars = canvas.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('y', height - margin.top)
      .attr('x', (d) => x(d[0]))
      .attr('height', 0)
      .attr('width', (width / data.length))
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  bars.transition()
      .delay((d, i) => i * 2)
      .duration(2500)
      .ease('bounce')
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => height - margin.bottom - y(d[1]));

  // x axis
  canvas.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

  // y axis
  canvas.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 12)
      .attr('dy', '.71em')
      .text(json.name);

  // Additional notes
  d3.select('#app').append('div')
      .attr('class', 'notes')
    .append('p')
      .text(json.description);
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
