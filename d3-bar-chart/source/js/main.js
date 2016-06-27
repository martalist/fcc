import d3 from 'd3';

// Stylesheets
require("../sass/style.scss");

const data = [5, 15, 30, 40, 60]
    , margin = { top: 20, bottom: 40, left: 20, right: 20 }
    , width = 960
    , barHeight = 40
    , height = barHeight * data.length + margin.top + margin.bottom;

const x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

const xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)

const canvas = d3.select('#app').append('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

canvas.selectAll('rect')
    .data(data)
  .enter().append('rect')
    .attr('x', margin.left)
    .attr('y', (d, i) => i * barHeight)
    .attr('width', (d) => x(d))
    .attr('height', barHeight - 1);

canvas.append('g')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .call(xAxis);
