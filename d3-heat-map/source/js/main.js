import * as d3 from 'd3';

// Stylesheets
require("../sass/style.scss");

const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const margin = {top: 20, right: 20, bottom: 30, left: 60}
    , width = 1200 - margin.left - margin.right
    , height = 550 - margin.top - margin.bottom;

const x = d3.scaleLinear()
    .range([0, width]);

const y = d3.scaleLinear()
    .range([height, 0]);

const xAxis = d3.axisBottom(x)
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
      , firstYear = d3.min(data.monthlyVariance, d => d.year)
      , lastYear = d3.max(data.monthlyVariance, d => d.year)
      , cellHeight = Math.round(height / 12)
      , cellWidth = Math.round(width / (lastYear - firstYear));

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
  svg.selectAll(".dot")
      .data(monthlyVariance)
    .enter().append("rect")
      .attr("class", "cell")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.month))
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .style("fill", d => color(d.variance))
      // .on('mouseover', function (dot) {
      //   if (tipFade) clearTimeout(tipFade);
      //   var matrix = this.getScreenCTM()
      //       .translate(+this.getAttribute("cx"), +this.getAttribute("cy"));
      //
      //   tooltip.html(`
      //     <p><span class="h4">${dot.Name}</span>  >  ${dot.Nationality}  >  ${dot.Year}</p>
      //     <p>${dot.Doping}</p>
      //     <p><strong>Time:</strong> ${dot.Time}</p>
      //     <p><a href="${dot.URL}" target="_blank" >more info</a>...</p>
      //   `)
      //     .style('opacity', '1')
      //     .style('left', matrix.e + 18 + 'px')
      //     .style('top', matrix.f -100 + 'px');
      // })
      // .on('mouseout', (dot) => {
      //   tipFade = setTimeout(() => {
      //     tooltip.style('opacity', '0');
      //   }, 1000);
      // });

  // legend
  const legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0, ${(height - margin.top) / 2 - i * 20})`);

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(d => d);

});
