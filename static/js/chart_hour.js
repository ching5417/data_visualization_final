var city_en = {'臺北市':"Taipei City",'新北市':"New Taipei City",'桃園市':"Taoyuan City",'臺中市':"Taichung City",'臺南市':"Tainan City",'高雄市':"Kaohsiung City",
'新竹縣':"Hsinchu County",'苗栗縣':"Miaoli County",'彰化縣':"Changhua County",'南投縣':"Nantou County",'雲林縣':"Yunlin County",'嘉義縣':"Chiayi County",'屏東縣':"Pingtung County",
'宜蘭縣':"Yilan County",'花蓮縣':"Hualien County",'臺東縣':"Taitung County",'澎湖縣':"Penghu County",'金門縣':"Kinmen County",'連江縣':"Lienchiang County",
'基隆市':"Keelung City",'新竹市':"Hsinchu City",'嘉義市':"Chiayi City"};

(function (d3) {
    'use strict';
  
    const search = (data, array, county) => {
      
      var formatting = d3.format("");
      
      data.forEach(d => {
        var formatting = d3.format("");
        if(d['county'] === county){
            for(var i = 0; i < 24; i++){
              var hour = 'hour_';
              array[i] = array[i] + parseInt(d[hour + formatting(i)]);
            }
        }
      });
      console.log(array);
    };
  
    var countyData;
  
    d3.csv('https://raw.githubusercontent.com/MingFengKuo/Data-Visualization-and-Visual-Analytics/master/DV_data_hour/AllTable.csv')
      .then(data => {
          countyData = data;
          render(data);
      });
  
    const svg_bottom = d3.select('#bottom_chart');
  
    const width = +svg_bottom.attr('width');
    const height = +svg_bottom.attr('height');
  
    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right - 190;
    const innerHeight = height - margin.top - margin.bottom - 10;
    var choose1_bottom = 0;
    var choose2_bottom = 0;
    var county0_bottom = "Taiwan";
    var county1_bottom = "Taiwan";
    var county2_bottom = "Taiwan";
  
    d3.select("#choose1_bottom").on("change", update);
    d3.select("#choose2_bottom").on("change", update);
    d3.select("#county0_bottom").on("change", update);
    d3.select("#county1_bottom").on("change", update);
    d3.select("#county2_bottom").on("change", update);
    // d3.selectAll("select").on("change", update);
  
    function update(){
        if (d3.select("#choose1_bottom").property("checked")) {choose1_bottom = 1;}
      else {choose1_bottom = 0;}	
        if (d3.select("#choose2_bottom").property("checked")) {choose2_bottom = 1;}
      else {choose2_bottom = 0;}
      county0_bottom = d3.select("#county0_bottom").node().value;
      county1_bottom = d3.select("#county1_bottom").node().value;
      county2_bottom = d3.select("#county2_bottom").node().value;
        svg_bottom.selectAll("*").remove();
      render(countyData);
    }
    
  
    const render = (data) => {
      
      var Acci = [];
      var Acci_chos1 = [];
      var Acci_chos2 = [];
      
      for(var i = 0; i < 24; i++){
        Acci.push(0);
        Acci_chos1.push(0);
        Acci_chos2.push(0);
      }
      
      search(data, Acci, county0_bottom);
      
      if(choose1_bottom){search(data, Acci_chos1, county1_bottom);}
      if(choose2_bottom){search(data, Acci_chos2, county2_bottom);}
      
      var accidentCount = [];
      var accidentCount_chos1 = [];
      var accidentCount_chos2 = [];
      var All_Table = [];
      
      for(var i = 0; i < 24; i++){
        accidentCount.push({hour: i, count: Acci[i]});
        accidentCount_chos1.push({hour: i, count: Acci_chos1[i]});
        accidentCount_chos2.push({hour: i, count: Acci_chos2[i]});
        All_Table.push({class: 0, hour: i, count: Acci[i]});
        All_Table.push({class: 1, hour: i, count: Acci_chos1[i]});
        All_Table.push({class: 2, hour: i, count: Acci_chos2[i]});
      }
      
      // const title = '車禍案件數及不同縣市比較';
      const xAxisLabel = '時間 - 小時';
      const yAxisLabel = '數件案';
      
      const xValue = d => d.hour;
      const yValue = d => d.count;
      
      const xScale = d3.scaleLinear()
        .domain(d3.extent(All_Table, xValue))
        .range([0, innerWidth]);
      
      const yScale = d3.scaleLinear()
        .domain(d3.extent(All_Table, yValue))
        .range([innerHeight, 0])
        .nice();
      
      const g_bottom = svg_bottom.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      
      // g.append('text')
      //     .attr('class', 'title')
      //         .attr('x', 0)
      //     .attr('y', -20)
      //     .text(title);
      
      var hour24 = [];
      for(var i = 0; i < 24; i++){
        hour24.push(i);
      }
      
      const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
          .tickValues(hour24)
        .tickPadding(10);
      
      const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);
      
      const yAxisG = g_bottom.append('g').call(yAxis);
      yAxisG.select('.domain').remove();
      
      yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', -120)
          .attr('x', -innerHeight / 3 + 20)
              .attr('rotate', 90)
          .attr('transform', `rotate(-90)`)
          .text(yAxisLabel);
      
      const xAxisG = g_bottom.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);
      xAxisG.select('.domain').remove();
      
      xAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', 70)
          .attr('x', innerWidth / 2)
          .text(xAxisLabel);
      
      var circleRadius = 6;
      
      var color = ['#FF7D7D', '#5FB4DC', '#8CD264'];
      
      g_bottom.selectAll('circle').data(All_Table)
        .enter().append('circle')
          .attr('cy', d => yScale(yValue(d)))
          .attr('cx', d => xScale(xValue(d)))
          .attr('r', circleRadius)
              .attr('fill', function(d) {if(d.count > 0) return color[d.class];
                                     else return '#00000000'});
      
      var line = d3.line()
              .x(d => xScale(d.hour))
            .y(d => yScale(d.count));
      
      d3.select('#bottom_chart').append('path')
        .attr('d', line(accidentCount))
        .attr("transform", "translate(151,61)")
          .attr('stroke', '#FF7D7D')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
      
      g_bottom.append('circle')
              .attr('cy', innerHeight - 10)
          .attr('cx', innerWidth + 35)
              .attr('r', circleRadius)
              .attr('fill', '#FF7D7D');
      
      g_bottom.append('text')
          .attr('y', innerHeight - 2)
              .attr('x', innerWidth + 50)
              .attr('font-size', 18)
              .attr('fill', '#635F5D')
          .text(county0_bottom);
      
      if(choose1_bottom){
          d3.select('#bottom_chart').append('path')
            .attr('d', line(accidentCount_chos1))
            .attr("transform", "translate(151,61)")
              .attr('stroke', '#5FB4DC')
            .attr('stroke-width', 2)
            .attr('fill', 'none');
        
          g_bottom.append('circle')
              .attr('cy', innerHeight - 45)
          .attr('cx', innerWidth + 35)
              .attr('r', circleRadius)
              .attr('fill', '#5FB4DC');
      
          g_bottom.append('text')
          .attr('y', innerHeight - 37)
              .attr('x', innerWidth + 50)
              .attr('font-size', 18)
            .attr('fill', '#635F5D')
          .text(county1_bottom);
      }
      
      if(choose2_bottom){
          d3.select('#bottom_chart').append('path')
            .attr('d', line(accidentCount_chos2))
            .attr("transform", "translate(151,61)")
              .attr('stroke', '#8CD264')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
        
              g_bottom.append('circle')
              .attr('cy', innerHeight - 80)
          .attr('cx', innerWidth + 35)
              .attr('r', circleRadius)
              .attr('fill', '#8CD264');
      
          g_bottom.append('text')
          .attr('y', innerHeight - 72)
              .attr('x', innerWidth + 50)
              .attr('font-size', 18)
            .attr('fill', '#635F5D')
          .text(county2_bottom);}
    };
  
  }(d3));
  