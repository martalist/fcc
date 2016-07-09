import * as d3 from 'd3';

// Stylesheets
require("../sass/style.scss");

const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const margin = {top: 20, right: 20, bottom: 80, left: 60}
    , width = 1200 - margin.left - margin.right
    , height = 550 - margin.top - margin.bottom;

const x = d3.scaleLinear()
    .range([0, width]);

const y = d3.scaleLinear()
    .range([height, 0]);

const xAxis = d3.axisBottom(x)
    .ticks(20)
    .tickFormat(d3.format('d'));

const color = d3.scaleLinear()
    .range(['#A5C5E8', '#E8B97B']);

const svg = d3.select("#app").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const tooltip = d3.select('main').append('div')
    .attr('class', 'tooltip');

d3.json(URL, (err, data) => {
  if (err) throw err;

  const { monthlyVariance } = data
      , [ firstYear, lastYear ] = d3.extent(monthlyVariance, d => d.year)
      , variance = d3.extent(monthlyVariance, d => d.variance)
      , legendDomain = domainFromExtent(variance, 10)
      , cellHeight = height / 12
      , cellWidth = width / (lastYear - firstYear);

  x.domain([firstYear, lastYear]);
  y.domain([13, 1]);

  // x axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Minutes behind fastest time");

  // y axis
  const yAxis = svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(-6, 0)");

  yAxis.selectAll('.month')
      .data(MONTHS)
    .enter().append('text')
      .attr('class', 'month')
      .attr('x', 0)
      .attr('y', (d,i) => y(i+1) + cellHeight / 2)
      .style("text-anchor", "end")
      .text(d => d);


  // plot cells
  svg.selectAll(".cell")
      .data(monthlyVariance)
    .enter().append("rect")
      .attr("class", "cell")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.month))
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .style("fill", d => color(d.variance))
      .on('mouseover', function (cell) {
        const e = d3.event;
        tooltip.html(`
          <p><span class="h4">${(cell.variance + data.baseTemperature).toPrecision(4)}℃</span></p>
          <p>${MONTHS[cell.month - 1]}, ${cell.year}</p>
          <p>Variance: ${cell.variance}℃</p>
        `)
          .style('opacity', '1')
          .style('left', e.pageX - 80 + 'px')
          .style('top', e.pageY - 100 + 'px');
      })
      .on('mouseout', (cell) => {
        tooltip.style('opacity', '0');
      });

  // legend
  const legend = svg.selectAll(".legend")
      .data(legendDomain)
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${i * 35 - width/3.4}, ${height + margin.top + 20})`);

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 35)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width)
      .attr("y", 29)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(d => d);

});

(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

function domainFromExtent(variance, outputLength) {
  const [ start, end ] = variance
      , domain = end - start
      , increment = domain / outputLength
      , mid = domain / 2;
  let result = [];
  for (var i = 0; i < outputLength; i++) {
    let value = Math.round10(increment * i - mid, -2);
    result.push(value);
  }
  return result;
}
