import * as d3 from 'd3';

// Stylesheets
require("../sass/style.scss");

const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
// const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const margin = {top: 20, right: 90, bottom: 30, left: 40}
    , width = 960 - margin.left - margin.right
    , height = 550 - margin.top - margin.bottom;

const x = d3.scaleLinear()
    .range([0, width]);

const y = d3.scaleLinear()
    .range([height, 0]);

const color = d3.scaleOrdinal(d3.schemeCategory10);

const svg = d3.select("main").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const tooltip = d3.select('main').append('div')
    .attr('class', 'tooltip');

let tipFade = null;

d3.json(URL, (err, data) => {
  if (err) throw err;

  // parse data
  data.forEach(d => {
    d.doped = !!d.Doping ? 'Riders with doping allegations' : 'No doping allegations';
  });

  x.domain(d3.extent(data, d => d.Seconds).reverse());
  y.domain([data.length + 1, 1]);

  // x axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Minutes behind fastest time");

  // y axis
  svg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Ranking");

  // plot circles
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", d => x(d.Seconds))
      .attr("cy", d => y(d.Place))
      .style("fill", d => color(d.doped))
      .on('mouseover', (dot) => {
        if (tipFade) clearTimeout(tipFade);
        tooltip.html(`
          <p><span class="h4">${dot.Name}</span> | ${dot.Nationality}</p>
          <p>${dot.Doping}</p>
          <p><strong>Time:</strong> ${dot.Time}</p>
          <p>${dot.Year} | <a href="${dot.URL}" target="_blank" >more info</a></p>
        `)
          .style('opacity', '1')
          .style('left', d3.event.pageX - 12 + 'px')
          .style('top', d3.event.pageY + 8 + 'px');
      })
      .on('mouseout', (dot) => {
        tipFade = setTimeout(() => {
          tooltip.style('opacity', '0');
        }, 1000);
      });

  svg.selectAll(".dot-text")
      .data(data)
    .enter().append("text")
      .attr('x', d => x(d.Seconds) + 8)
      .attr('y', d => y(d.Place) + 4)
      .style('fill', 'black')
      .text(d => d.Name);

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
