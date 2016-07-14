import * as d3 from 'd3';
import spritePositions from './countrySpritePositions';

// Stylesheets
require("../sass/style.scss");

const URL = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

const width = 960
    , height = 600
    , flagWidth = 16
    , flagHeight = 11;

const svg = d3.select("#app").append("svg")
    .attr("width", width)
    .attr("height", height);

const tooltip = d3.select('#app').append('div')
    .attr('class', 'tooltip');

const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.code; }))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('x', d3.forceX().strength(.12))
    .force('y', d3.forceY().strength(.165));

d3.json(URL, (err, data) => {
  if (err) throw err;

  const { nodes } = data;
  const links = data.links.map((v) => ({
    target: nodes[v.target].code,
    source: nodes[v.source].code
  }));

  const symbol = svg.append('defs')
    .selectAll('symbol')
      .data(nodes)
    .enter().append('symbol')
      .attr('id', d => d.code)
      .attr('viewBox', d => `${spritePositions[d.code]} 16 11`)
    .append('image')
      .attr('xlink:href', '/public/flags.png')
      .attr('width', '256px')
      .attr('height', '176px')
      .attr('x', 0)
      .attr('y', 0);

  const link = svg.append('g')
      .attr('class', 'links')
    .selectAll('line')
      .data(links)
    .enter().append('line');

  const node = svg.append('g')
      .attr('class', 'nodes')
    .selectAll(".country")
      .data(nodes)
    .enter().append("use")
      .attr('class', 'country')
      .attr('xlink:href', d => `#${d.code}`)
      .attr('width', flagWidth)
      .attr('height', flagHeight)
      .call(d3.drag()
        .on("start", d => {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        })
        .on("drag", d => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        })
        .on("end", d => {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        })
      );

  // tooltip
  node
    .on('mouseover', d => {
      const e = d3.event
          , body = d3.select('body').node()
          , x = e.pageX - body.scrollLeft - 75
          , y = e.pageY - body.scrollTop - 40;
      tooltip
        .html(`<h4>${d.country}</h4>`)
        .style("opacity", 0.9)
        .style("left", x + 'px')
        .style("top", y + 'px');
    })
    .on('mouseout', d => {
      tooltip.style("opacity", 0);
    });

  simulation.nodes(nodes)
      .on('tick', d => {
        link
          .attr('x1', d => d.source.x + flagWidth / 2)
          .attr('y1', d => d.source.y + flagHeight / 2)
          .attr('x2', d => d.target.x + flagWidth / 2)
          .attr('y2', d => d.target.y + flagHeight / 2);

        node
          .attr('x', d => d.x)
          .attr('y', d => d.y);
      });

  simulation.force('link').links(links).distance(30).strength(1);
});
