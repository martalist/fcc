import * as d3 from 'd3';

// Stylesheets
require("../sass/style.scss");

const URL = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
// const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const margin = {top: 20, right: 90, bottom: 30, left: 40}
    , width = 900 - margin.left - margin.right
    , height = 550 - margin.top - margin.bottom;

const x = d3.scaleTime()
    .rangeRound([0, width]);

const y = d3.scaleLinear()
    .range([height, 0]);

const xAxis = d3.axisBottom(x)
    .tickFormat(d3.timeFormat('%M:%S'));

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

  const fastest = data.reduce((a,b) => a.Place < b.Place ? a : b)
      , slowest = data.reduce((a,b) => a.Place > b.Place ? a : b);
  let baseTime = new Date(new Date(2016, 0, 1, 0, 0 ,0).getTime() - fastest.Seconds * 1000).getTime();

  // parse data
  data.forEach(d => {
    d.doped = !!d.Doping ? 'Riders with doping allegations' : 'No doping allegations';
    d.time = new Date(baseTime + d.Seconds * 1000);
  });

  const start = new Date(baseTime + slowest.Seconds * 1000 + 2000)
      , end = d3.min(data, d => d.time);
  x.domain([start, end]);
  y.domain([data.length + 1, 1]);

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
      .attr("cx", d => x(d.time))
      .attr("cy", d => y(d.Place))
      .style("fill", d => color(d.doped))
      .on('mouseover', function (dot) {
        if (tipFade) clearTimeout(tipFade);
        var matrix = this.getScreenCTM()
            .translate(+this.getAttribute("cx"), +this.getAttribute("cy"));

        tooltip.html(`
          <p><span class="h4">${dot.Name}</span>  >  ${dot.Nationality}  >  ${dot.Year}</p>
          <p>${dot.Doping}</p>
          <p><strong>Time:</strong> ${dot.Time}</p>
          <p><a href="${dot.URL}" target="_blank" >more info</a>...</p>
        `)
          .style('opacity', '1')
          .style('left', matrix.e + 18 + 'px')
          .style('top', matrix.f -100 + 'px');
      })
      .on('mouseout', (dot) => {
        tipFade = setTimeout(() => {
          tooltip.style('opacity', '0');
        }, 1000);
      });

  svg.selectAll(".dot-text")
      .data(data)
    .enter().append("text")
      .attr('x', d => x(d.time) + 8)
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
