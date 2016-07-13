import * as d3 from 'd3';

// Stylesheets
require("../sass/style.scss");

const URL = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

const width = 960
    , height = 600
    , diameter = 10;

const svg = d3.select("#app").append("svg")
    .attr("width", width)
    .attr("height", height);

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

  const link = svg.append('g')
      .attr('class', 'links')
    .selectAll('line')
      .data(links)
    .enter().append('line');

  const node = svg.append('g')
      .attr('class', 'nodes')
    .selectAll(".country")
      .data(nodes)
    .enter().append("circle")
      .attr('r', diameter / 2)
      .classed('country', true)
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

  node.append('title')
      .text((d) => d.country + ', ' + d.code);

  simulation.nodes(nodes)
      .on('tick', d => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
      });

  simulation.force('link').links(links).distance(30).strength(1);
});
