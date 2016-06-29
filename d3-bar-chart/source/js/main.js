import d3 from 'd3';

// Stylesheets
require("../sass/style.scss");

const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const margin = { top: 20, bottom: 40, left: 40, right: 20 }
    , width = 960 - margin.left - margin.right
    , height = 500 - margin.top - margin.bottom

const x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

const y = d3.scale.linear()
    .range([height, 0])

// fetch data
d3.json(URL, (err, json) => {
  if (err) console.error(err);

  const data = json.data.map((d) => [ new Date(d[0]), +d[1] ]);

  x.domain(data.map( (d) => d[0] ))
  y.domain([d3.max(data, (d) => d[1] ), 0])

  const canvas = d3.select('#app').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  canvas.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('y', (d) => height - margin.top - y(d[1]))
      .attr('x', (d) => x(d[0]))
      .attr('height', (d) => y(d[1]))
      .attr('width', (width / data.length) - 1);
});
