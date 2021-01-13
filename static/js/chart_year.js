var city_en = {'臺北市':"Taipei City",'新北市':"New Taipei City",'桃園市':"Taoyuan City",'臺中市':"Taichung City",'臺南市':"Tainan City",'高雄市':"Kaohsiung City",
'新竹縣':"Hsinchu County",'苗栗縣':"Miaoli County",'彰化縣':"Changhua County",'南投縣':"Nantou County",'雲林縣':"Yunlin County",'嘉義縣':"Chiayi County",'屏東縣':"Pingtung County",
'宜蘭縣':"Yilan County",'花蓮縣':"Hualien County",'臺東縣':"Taitung County",'澎湖縣':"Penghu County",'金門縣':"Kinmen County",'連江縣':"Lienchiang County",
'基隆市':"Keelung City",'新竹市':"Hsinchu City",'嘉義市':"Chiayi City"};

(function (d3) {
    'use strict';
  
    const search = (data, array, county) => {
      data.forEach(d => {
          if(d['county'] === county){
            if(d['table'] === '103A1' || d['table'] === '103A2'){
              array[0] = array[0] + parseInt(d['hour_all']);
            }
            if(d['table'] === '104A1' || d['table'] === '104A2'){
              array[1] = array[1] + parseInt(d['hour_all']);
            }
            if(d['table'] === '105A1' || d['table'] === '105A2'){
              array[2] = array[2] + parseInt(d['hour_all']);
            }
            if(d['table'] === '106A1' || d['table'] === '106A2'){
              array[3] = array[3] + parseInt(d['hour_all']);
            }
            if(d['table'] === '107A1' || d['table'] === '107A2'){
              array[4] = array[4] + parseInt(d['hour_all']);
            }
            if(d['table'] === '108A1' || d['table'] === '108A2'){
              array[5] = array[5] + parseInt(d['hour_all']);
            }
          }
      });
    };
  
    var countyData;
  
    d3.csv('https://raw.githubusercontent.com/MingFengKuo/Data-Visualization-and-Visual-Analytics/master/DV_data_hour/AllTable.csv')
      .then(data => {
          countyData = data;
          render_top(data);
      });
  
    const svg_top = d3.select("#top_chart");
  
    const width = +svg_top.attr('width');
    const height = +svg_top.attr('height');
  
    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right - 190;
    const innerHeight = height - margin.top - margin.bottom - 10;
    var choose1_top = 0;
    var choose2_top = 0;
    var county0_top = "Taiwan";
    var county1_top = "Taiwan";
    var county2_top = "Taiwan";
  
    d3.select("#choose1_top").on("change", update_top);
    d3.select("#choose2_top").on("change", update_top);
    d3.select("#county0_top").on("change", update_top);
    d3.select("#county1_top").on("change", update_top);
    d3.select("#county2_top").on("change", update_top);
    // d3.selectAll("select").on("change", update_top);
  
    function update_top(){
        if (d3.select("#choose1_top").property("checked")) {choose1_top = 1;}
      else {choose1_top = 0;}	
        if (d3.select("#choose2_top").property("checked")) {choose2_top = 1;}
      else {choose2_top = 0;}
      county0_top = d3.select("#county0_top").node().value;
      county1_top = d3.select("#county1_top").node().value;
      county2_top = d3.select("#county2_top").node().value;
      svg_top.selectAll("*").remove();
      render_top(countyData);
    }
    function update_top_(s){
      if (d3.select("#choose1_top").property("checked")) {choose1_top = 1;}
    else {choose1_top = 0;}	
      if (d3.select("#choose2_top").property("checked")) {choose2_top = 1;}
    else {choose2_top = 0;}
    county0_top = city_en[s];
    county1_top = d3.select("#county1_top").node().value;
    county2_top = d3.select("#county2_top").node().value;
    svg_top.selectAll("*").remove();
    render_top(countyData);
  }
  
    const render_top = (data) => {
      
      var Acci = [];
      var Acci_chos1 = [];
      var Acci_chos2 = [];
      
      for(var i = 0; i < 6; i++){
        Acci.push(0);
        Acci_chos1.push(0);
        Acci_chos2.push(0);
      }
        
      search(data, Acci, county0_top);
      
      if(choose1_top){search(data, Acci_chos1, county1_top);}
      if(choose2_top){search(data, Acci_chos2, county2_top);}
      
      var accidentCount = [];
      var accidentCount_chos1 = [];
      var accidentCount_chos2 = [];
      var All_Table = [];
      
      for(var i = 0; i < 6; i++){
        accidentCount.push({year: i+103, count: Acci[i]});
        accidentCount_chos1.push({year: i+103, count: Acci_chos1[i]});
        accidentCount_chos2.push({year: i+103, count: Acci_chos2[i]});
        All_Table.push({class: 0, year: i+103, count: Acci[i]});
        All_Table.push({class: 1, year: i+103, count: Acci_chos1[i]});
        All_Table.push({class: 2, year: i+103, count: Acci_chos2[i]});
      }
      
    //   const title = '車禍案件數及不同縣市比較';
      const xAxisLabel = '時間 - 年';
      const yAxisLabel = '數件案';
      
      const xValue = d => d.year;
      const yValue = d => d.count;
      
      const xScale = d3.scaleLinear()
        .domain(d3.extent(All_Table, xValue))
        .range([0, innerWidth]);
      
      const yScale = d3.scaleLinear()
        .domain(d3.extent(All_Table, yValue))
        .range([innerHeight, 0])
        .nice();
      
      const g_top = svg_top.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      
    //   g.append('text')
    //       .attr('class', 'title')
    //           .attr('x', 0)
    //       .attr('y', -20)
    //       .text(title);
      
      const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
          .tickValues([103,104,105,106,107,108])
          .tickFormat(function(d){return d + '年';})
        .tickPadding(10);
      
      const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);
      
      const yAxisG = g_top.append('g').call(yAxis);
      yAxisG.select('.domain').remove();
      
      yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', -120)
          .attr('x', -innerHeight / 3 + 20)
              .attr('rotate', 90)
          .attr('transform', `rotate(-90)`)
          .text(yAxisLabel);
      
      const xAxisG = g_top.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);
      xAxisG.select('.domain').remove();
      
      xAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', 70)
          .attr('x', innerWidth / 2)
          .text(xAxisLabel);
      
      var circleRadius = 6;
      
      var color = ['#FF7D7D', '#5FB4DC', '#8CD264'];
      
      g_top.selectAll('circle').data(All_Table)
        .enter().append('circle')
          .attr('cy', d => yScale(yValue(d)))
          .attr('cx', d => xScale(xValue(d)))
          .attr('r', circleRadius)
              .attr('fill', function(d) {if(d.count > 0) return color[d.class];
                                     else return '#00000000'});
      
      var line = d3.line()
              .x(d => xScale(d.year))
            .y(d => yScale(d.count));
      
      d3.select("#top_chart").append('path')
        .attr('d', line(accidentCount))
        .attr("transform", "translate(151,61)")
          .attr('stroke', '#FF7D7D')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
      
      g_top.append('circle')
              .attr('cy', innerHeight - 10)
          .attr('cx', innerWidth + 35)
              .attr('r', circleRadius)
              .attr('fill', '#FF7D7D');
      
      g_top.append('text')
          .attr('y', innerHeight - 2)
              .attr('x', innerWidth + 50)
              .attr('font-size', 18)
              .attr('fill', '#635F5D')
          .text(county0_top);
      
      if(choose1_top){
          d3.select("#top_chart").append('path')
            .attr('d', line(accidentCount_chos1))
            .attr("transform", "translate(151,61)")
              .attr('stroke', '#5FB4DC')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
        
          g_top.append('circle')
              .attr('cy', innerHeight - 45)
          .attr('cx', innerWidth + 35)
              .attr('r', circleRadius)
              .attr('fill', '#5FB4DC');
      
          g_top.append('text')
          .attr('y', innerHeight - 37)
              .attr('x', innerWidth + 50)
              .attr('font-size', 18)
            .attr('fill', '#635F5D')
          .text(county1_top);
      }
      
      if(choose2_top){
          d3.select("#top_chart").append('path')
            .attr('d', line(accidentCount_chos2))
            .attr("transform", "translate(151,61)")
              .attr('stroke', '#8CD264')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
        
              g_top.append('circle')
              .attr('cy', innerHeight - 80)
          .attr('cx', innerWidth + 35)
              .attr('r', circleRadius)
              .attr('fill', '#8CD264');
      
          g_top.append('text')
          .attr('y', innerHeight - 72)
              .attr('x', innerWidth + 50)
              .attr('font-size', 18)
            .attr('fill', '#635F5D')
          .text(county2_top);}
    };
  
  }(d3));
  