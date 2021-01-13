// var all_city_name = ['-請選擇-', '臺北市','新北市','桃園市','臺中市','臺南市','高雄市',
// '新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣',
// '宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣',
// '基隆市','新竹市','嘉義市'];


var all_city_name = ['-請選擇-', '基隆市', '臺北市','新北市','桃園市',
'新竹市', '新竹縣', '苗栗縣','臺中市','彰化縣','南投縣', 
'雲林縣','嘉義市','嘉義縣','臺南市','高雄市','屏東縣',
'宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣'];

var all_city_lat_long = {'臺北市':[25.087781,121.5598],'新北市':[24.91571,121.6739],'桃園市':[24.831701,121.237458],
'臺中市':[24.23321,120.9417],'臺南市':[23.140105,120.331414],'高雄市':[22.985966,120.666],
'新竹縣':[24.70328,121.1252],'苗栗縣':[24.48927,120.9417],'彰化縣':[23.99297,120.4818],'南投縣':[23.83876,120.9876],
'雲林縣':[23.75585,120.3897],'嘉義縣':[23.45889,120.574],'屏東縣':[22.370476,120.62],
'宜蘭縣':[24.69295,121.7195],'花蓮縣':[23.7569,121.3542],'臺東縣':[22.665937,121.246482],
'澎湖縣':[23.590884,119.581719],'金門縣':[24.439576,118.334973],'連江縣':[26.151218,119.936364],
'基隆市':[25.10898,121.7081],'新竹市':[24.785081,120.958588],'嘉義市':[23.47545,120.4473]};

var all_city_view = {'臺北市':11,'新北市':9,'桃園市':9.3,'臺中市':9.3,'臺南市':9,'高雄市':9.1,
'新竹縣':9,'苗栗縣':9,'彰化縣':10,'南投縣':9,'雲林縣':9,'嘉義縣':9,'屏東縣':9,
'宜蘭縣':9,'花蓮縣':8,'臺東縣':8,'澎湖縣':10.5,'金門縣':11,'連江縣':10,
'基隆市':11,'新竹市':11,'嘉義市':11.5};

var find_a2 = {'臺北市':0,'新北市':0,'桃園市':0,'臺中市':1,'臺南市':1,'高雄市':1,
'新竹縣':1,'苗栗縣':1,'彰化縣':2,'南投縣':2,'雲林縣':2,'嘉義縣':2,'屏東縣':2,
'宜蘭縣':2,'花蓮縣':2,'臺東縣':2,'澎湖縣':2,'金門縣':2,'連江縣':2,
'基隆市':2,'新竹市':2,'嘉義市':2};

// var city_en = {'臺北市':"Taipei City",'新北市':"New Taipei City",'桃園市':"Taoyuan City",'臺中市':"Taichung City",'臺南市':"Tainan City",'高雄市':"Kaohsiung City",
// '新竹縣':"Hsinchu County",'苗栗縣':"Miaoli County",'彰化縣':"Changhua County",'南投縣':"Nantou County",'雲林縣':"Yunlin County",'嘉義縣':"Chiayi County",'屏東縣':"Pingtung County",
// '宜蘭縣':"Yilan County",'花蓮縣':"Hualien County",'臺東縣':"Taitung County",'澎湖縣':"Penghu County",'金門縣':"Kinmen County",'連江縣':"Lienchiang County",
// '基隆市':"Keelung City",'新竹市':"Hsinchu City",'嘉義市':"Chiayi City"};

var select_index = {'基隆市':1, '臺北市':2,'新北市':3,'桃園市':4,
'新竹市':5, '新竹縣':6, '苗栗縣':7,'臺中市':8,'彰化縣':9,'南投縣':10, 
'雲林縣':11,'嘉義市':12,'嘉義縣':13,'臺南市':14,'高雄市':15,'屏東縣':16,
'宜蘭縣':17,'花蓮縣':18,'臺東縣':19,'澎湖縣':20,'金門縣':21,'連江縣':22};


var a1_icon = L.icon({
    iconUrl: 'static/images/a1.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [15, 20], // size of the icon [10, 15]
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location [10, 15]
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var a2_icon = L.icon({
    iconUrl: 'static/images/a2.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [15, 20], // size of the icon [10, 15]
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location [10, 15]
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var top3_icon = L.icon({
    iconUrl: 'static/images/top3.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [15, 20], // size of the icon [10, 15]
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location [10, 15]
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});


var marker_data_a1;
$.getScript('https://ching5417.github.io/final_tmp_data_a1/data_a1.js', function(){
    marker_data_a1 = a1;
});
var marker_data_a2;
$.getScript('https://ching5417.github.io/final_tmp_data_a2/data_a2.js', function(){
    marker_data_a2 = a2;
});
var marker_data_a2_1;
$.getScript('https://ching5417.github.io/final_tmp_data_a2_1/data_a2_1.js', function(){
    marker_data_a2_1 = a2_1;
});
var marker_data_a2_2;
$.getScript('https://ching5417.github.io/final_tmp_data_a2_2/data_a2_2.js', function(){
    marker_data_a2_2 = a2_2;
});
var marker_data_top3;
$.getScript('https://ching5417.github.io/final_tmp_data_top3/top3.js', function(){
    marker_data_top3 = top3_c;
});
var map_geo;
$.getScript('static/js/geo.js', function(){
    map_geo = map_g;
});



function updateProgressBar(processed, total, elapsed, layersArray) {
    if (elapsed > 1000) {
        // if it takes more than a second to load, display the progress bar:
        progress.style.display = 'block';
        progressBar.style.width = Math.round(processed/total*100) + '%';
    }

    if (processed === total) {
        // all markers processed - hide the progress bar:
        progress.style.display = 'none';
    }
}


let city_select = document.getElementById("city_select");
var map;
var first_draw = true;

for(let i = 0; i < all_city_name.length; i ++){
    city_select.options[i] = new Option(all_city_name[i],all_city_name[i]);
}
var selected_city = '臺北市';
selected_fn_first();
function selected_fn_first(){
    map = L.map('map').setView([24.271694,120.507181], 6.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> | <a href="https://noob.tw/openstreetmap/">Tutorial 教學</a>',
        maxZoom: 18,
    }).addTo(map);
    first_draw = false;
}
function selected_fn(s){
    $.ajaxSettings.async = false; 
    if(s === '-請選擇-'){
        
    }
    else{
        // var event_1 = new Event('change');
        // document.getElementById("county0_top").dispatchEvent(event_1);
        // var event_2 = new Event('change');
        // document.getElementById("county0_bottom").dispatchEvent(event_2);
        selected_city = s;
        if(!first_draw){
            map.remove();
        }
        draw_map(selected_city);
        first_draw = false;
        document.getElementById("county0_top").selectedIndex = select_index[s];
        document.getElementById("county0_bottom").selectedIndex = select_index[s];
        $('select#county0_top').trigger("change");
        $('select#county0_bottom').trigger("change");
    }
}
function draw_map(selected_city){
    map = L.map('map', {zoom: 13}).setView(all_city_lat_long[selected_city], all_city_view[selected_city]);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> | <a href="https://noob.tw/openstreetmap/">Tutorial 教學</a>',
        maxZoom: 18,
    }).addTo(map);

    let county_city = L.geoJSON(map_geo.features, {
        style: function(d){
            if(d.properties.name === selected_city){
                return {color: 'red',
                        strokeWidth:2,
                        strokeColor: 'red',
                        fillOpacity: .08,
                        };
            }
            else{
                return {
                        strokeWidth:0,
                        strokeColor: null,
                        color: null,
                        fillOpacity: 0
                        };
            }
        }
    });
    map.addLayer(county_city);
    
    /***** markers grop *****/
    var markers = L.markerClusterGroup({ disableClusteringAtZoom: 16, chunkedLoading: true, chunkProgress: updateProgressBar });
    for(let i = 0; i < marker_data_a1[selected_city].length; i++){
        let this_data_a1 = marker_data_a1[selected_city][i];
        let t_a1 = "【詳細資料】\n"
                +" 座標: ("+this_data_a1[0]+","+this_data_a1[1]+")\n"
                +" 發生時間: "+this_data_a1[2]+"\n"
                +" 發生地點: "+this_data_a1[3]+"\n"
                +" 死亡受傷人數: "+this_data_a1[4]+"\n"
                +" 車種: "+this_data_a1[5];  //2-5
        let coor_a1 = [parseFloat(this_data_a1[0]), parseFloat(this_data_a1[1])];
        markers.addLayer(L.marker(coor_a1, {icon: a1_icon, title: t_a1})); //將 L.mark(地標) 的圖層放到 makers 上面
    }
    if(find_a2[selected_city] === 0){
        for(let j = 0; j < marker_data_a2[selected_city].length; j++){
            let this_data_a2 = marker_data_a2[selected_city][j];
            let t_a2 = "【詳細資料】\n"
                    +" 座標: ("+this_data_a2[0]+","+this_data_a2[1]+")\n"
                    +" 發生時間: "+this_data_a2[2]+"\n"
                    +" 發生地點: "+this_data_a2[3]+"\n"
                    +" 死亡受傷人數: "+this_data_a2[4]+"\n"
                    +" 車種: "+this_data_a2[5];  //2-5
            
            let coor_a2 = [parseFloat(this_data_a2[0]), parseFloat(this_data_a2[1])];
            markers.addLayer(L.marker(coor_a2, {icon: a2_icon, title: t_a2})); //將 L.mark(地標) 的圖層放到 makers 上面
        }
    }
    else if(find_a2[selected_city] === 1){
        for(let m = 0; m < marker_data_a2_1[selected_city].length; m++){
            let this_data_a2_1 = marker_data_a2_1[selected_city][m];
            let t_a2_1 = "【詳細資料】\n"
                    +" 座標: ("+this_data_a2_1[0]+","+this_data_a2_1[1]+")\n"
                    +" 發生時間: "+this_data_a2_1[2]+"\n"
                    +" 發生地點: "+this_data_a2_1[3]+"\n"
                    +" 死亡受傷人數: "+this_data_a2_1[4]+"\n"
                    +" 車種: "+this_data_a2_1[5];  //2-5
            
            let coor_a2_1 = [parseFloat(this_data_a2_1[0]), parseFloat(this_data_a2_1[1])];
            markers.addLayer(L.marker(coor_a2_1, {icon: a2_icon, title: t_a2_1})); //將 L.mark(地標) 的圖層放到 makers 上面
        }
    }
    else{
        for(let n = 0; n < marker_data_a2_2[selected_city].length; n++){
            let this_data_a2_2 = marker_data_a2_2[selected_city][n];
            let t_a2_2 = "【詳細資料】\n"
                    +" 座標: ("+this_data_a2_2[0]+","+this_data_a2_2[1]+")\n"
                    +" 發生時間: "+this_data_a2_2[2]+"\n"
                    +" 發生地點: "+this_data_a2_2[3]+"\n"
                    +" 死亡受傷人數: "+this_data_a2_2[4]+"\n"
                    +" 車種: "+this_data_a2_2[5];  //2-5
            
            let coor_a2_2 = [parseFloat(this_data_a2_2[0]), parseFloat(this_data_a2_2[1])];
            markers.addLayer(L.marker(coor_a2_2, {icon: a2_icon, title: t_a2_2})); //將 L.mark(地標) 的圖層放到 makers 上面
        }
    }
    
    map.addLayer(markers); //將 markers 放到 map 的圖層上
    /***** markers grop *****/

    for(let k = 0; k < marker_data_top3[selected_city].length; k++){
        let this_data_top3 = marker_data_top3[selected_city][k];
        let coor_top3 = [parseFloat(this_data_top3[0]), parseFloat(this_data_top3[1])];
        L.circle(coor_top3, {color: null,
        fillColor: 'blue',
        fillOpacity: 0.02,
        radius: 200}).addTo(map);
    }
}
