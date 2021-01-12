const titleText = '';
const xAxisLabelText = '發生數量';

const svg = d3.select('#bar_chart');

const width = +svg.attr('width');
const height = +svg.attr('height');
// const svg = document.getElementById("#bar_chart").getSVGDocument();
// svg.attr("width", 900)
//     .attr("height", 400)

const render = data => {
  const xValue = d => d.count;
  const yValue = d => d.road;
  const margin = { top: 20, right: 20, bottom: 50, left: 180 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);
  
  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  // const xAxisTickformat = number =>
  //   d3.format('.3s')(number)
  //     .replace('G', 'B');
  
  const xAxis = d3.axisBottom(xScale)
  //   .tickFormat(xAxisTickformat)
    .tickSize(-innerHeight);
  
  g.append('g')
    .call(d3.axisLeft(yScale))
    .selectAll('.domain, .tick line')
    .remove();
  
  const xAxisG = g.append('g').call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);
  
  xAxisG.select('.domain').remove();
  
  xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 30)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabelText);
  
  g.selectAll('rect').data(data)
    .enter().append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth());
  
  g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .text(titleText);
};

// d3.csv('static/data_chart2/' + "台北市" + '.csv').then(data => {
//   console.log(data)
//   data.forEach(d => {
//       console.log(d.road)
//     d.count = +d.count;
//   });
//   render(data);
// });
render({});

function changeSelection(s) {
  svg.selectAll("*").remove();
  d3.csv('static/data_chart2/' + s + '.csv').then(data => {
      console.log(data)
      data.forEach(d => {
          console.log(d.road)
        d.count = +d.count;
      });
      render(data);
    });
}