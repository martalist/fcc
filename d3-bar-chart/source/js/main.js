import d3 from 'd3';
import tooltip from 'd3-tip';

// Stylesheets
require("../sass/style.scss");

const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const margin = { top: 20, bottom: 20, left: 40, right: 20 }
    , width = 960 - margin.left - margin.right
    , height = 500 - margin.top - margin.bottom

const x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

const simpleX = d3.time.scale()
    .range([margin.left, width - margin.right])

const y = d3.scale.linear()
    .range([height - margin.bottom, 0])

const canvas = d3.select('#app').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// tooltip
const tip = tooltip().html((d) => `${d[0].getFullYear()}, $${d[1]} billion`)
canvas.call(tip)

// fetch data
d3.json(URL, (err, json) => {
  if (err) console.error(err);

  // parse data
  const data = json.data.map((d) => [ new Date(d[0]), +d[1] ]);

  x.domain(data.map( (d) => d[0] ))
  y.domain([d3.max(data, (d) => d[1] ), 0])
  simpleX.domain([data[0][0], data[data.length - 1][0] ])

  const xAxis = d3.svg.axis()
      .scale(simpleX)
      .orient('bottom')
      .tickFormat(d3.time.format("%Y"))
      .ticks(10)

  const yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .ticks(6)

  canvas.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('y', (d) => height - margin.top - y(d[1]))
      .attr('x', (d) => x(d[0]))
      .attr('height', (d) => y(d[1]))
      .attr('width', (width / data.length) - 1)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

  canvas.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)

  canvas.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
});
