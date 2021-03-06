var all_city_name = ['-請選擇-', '臺北市','新北市','桃園市','臺中市','臺南市','高雄市',
'新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣',
'宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣',
'基隆市','新竹市','嘉義市'];

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

// let marker_data =  eval('{{marker_data|safe}}'); 
// let marker_data = JSON.parse('{{ marker_data | tojson | safe}}');
// var marker_data_a1;
// $.getJSON('static/json/臺北市_a1.json', data=>{
//     marker_data_a1 = data;
// });
// var marker_data_a2;
// $.getJSON('static/json/臺北市_a2.json', data=>{
//     marker_data_a2 = data;
// });
var marker_data_a1;
$.getScript('static/js/data_a1.js', function(){
    marker_data_a1 = a1;
});
var marker_data_a2;
$.getScript('static/js/data_a2.js', function(){
    marker_data_a2 = a2;
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
var selected_city = '臺北市'//document.getElementById("city_select").value;
selected_fn_first();
function selected_fn_first(){
    map = L.map('map').setView([24.271694,120.507181], 6.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> | <a href="https://noob.tw/openstreetmap/">Tutorial 教學</a>',
        maxZoom: 18,
    }).addTo(map);
    first_draw = false;
}
function json_fn(s){
    let json_file_name_1 = 'static/json/'+s+'_a1.json';
    $.getJSON(json_file_name_1, data=>{
        marker_data_a1 = data;
    });
    $.ajaxSettings.async = false; 
    let json_file_name_2 = 'static/json/'+s+'_a2.json';
    $.getJSON(json_file_name_2, data=>{
        marker_data_a2 = data;
    });
}
function selected_fn(s){
    $.ajaxSettings.async = false; 
    if(s === '-請選擇-'){
        
    }
    else if(s === '全台灣'){
        if(!first_draw){
            map.remove();
        }
        draw_all_map();
        first_draw = false;
    }
    else{
        selected_city = s;
        // $("p").text(marker_data_a1['臺北市']);
        // $("p").text(marker_data_a2['臺北市']);
        if(!first_draw){
            map.remove();
        }
        // map.remove();
        draw_map(selected_city);
        first_draw = false;
    }
    
}
function draw_map(selected_city){
    
    map = L.map('map', {zoom: 13}).setView(all_city_lat_long[selected_city], all_city_view[selected_city]);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> | <a href="https://noob.tw/openstreetmap/">Tutorial 教學</a>',
        maxZoom: 18,
    }).addTo(map);
    // let selected_city = '台北市';
    $.getJSON('static/json/taiwanCities.geojson.json', data=>{
        let county_city = L.geoJSON(data.features, {
            style: function(d){
                if(d.properties.name === selected_city){
                    // $("p").text(d.properties.name);
                    return {color: 'red',
                            strokeWidth:2,
                            strokeColor: 'red',
                            // fillColor: '#f03',
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
        county_city.addTo(map);
    });
    // let markers = [L.marker([22.6214074,120.3103684]),L.marker([24.785423, 120.987970])]
    // var marker = L.marker([22.6214074,120.3103684]);
    // var markers = marker_data[selected_city];
    /***** origin *****/
    // for(let i = 0; i < marker_data_a1[selected_city].length; i++){
    //     L.marker(marker_data_a1[selected_city][i],{icon: a1_icon}).addTo(map);
    // }
    // for(let i = 0; i < marker_data_a2[selected_city].length; i++){
    //     L.marker(marker_data_a2[selected_city][i],{icon: a2_icon}).addTo(map);
    // }
    /***** origin *****/


    /***** markers grop *****/
    var markers = L.markerClusterGroup({ disableClusteringAtZoom: 16, chunkedLoading: true, chunkProgress: updateProgressBar });
    for(let i = 0; i < marker_data_a1[selected_city].length; i++){
        this_data_a1 = marker_data_a1[selected_city][i];
        let t = "【詳細資料】\n"
                +" 座標: ("+this_data_a1[0]+","+this_data_a1[1]+")\n"
                +" 發生時間: "+this_data_a1[2]+"\n"
                +" 發生地點: "+this_data_a1[3]+"\n"
                +" 死亡受傷人數: "+this_data_a1[4]+"\n"
                +" 車種: "+this_data_a1[5];  //2-5
        coor = [parseFloat(this_data_a1[0]), parseFloat(this_data_a1[1])];
        markers.addLayer(L.marker(coor, {icon: a1_icon, title: t})); //將 L.mark(地標) 的圖層放到 makers 上面
        // markers.addLayer(L.marker(new L.LatLng(marker_data_a1[selected_city][i]),{icon: a1_icon})); //將 L.mark(地標) 的圖層放到 makers 上面
    }
    for(let j = 0; j < marker_data_a2[selected_city].length; j++){
        this_data_a2 = marker_data_a2[selected_city][j];
        let t = "【詳細資料】\n"
                +" 座標: ("+this_data_a2[0]+","+this_data_a2[1]+")\n"
                +" 發生時間: "+this_data_a2[2]+"\n"
                +" 發生地點: "+this_data_a2[3]+"\n"
                +" 死亡受傷人數: "+this_data_a2[4]+"\n"
                +" 車種: "+this_data_a2[5];  //2-5
        coor = [parseFloat(this_data_a2[0]), parseFloat(this_data_a2[1])];
        markers.addLayer(L.marker(coor, {icon: a2_icon, title: t})); //將 L.mark(地標) 的圖層放到 makers 上面
        // markers.addLayer(L.marker(new L.LatLng(marker_data_a2[selected_city][i]),{icon: a2_icon})); //將 L.mark(地標) 的圖層放到 makers 上面
    }
    map.addLayer(markers); //將 markers 放到 map 的圖層上
    /***** markers grop *****/

}
function draw_all_map(){
    map = L.map('map').setView([24.271694,120.507181], 6.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> | <a href="https://noob.tw/openstreetmap/">Tutorial 教學</a>',
        maxZoom: 18,
    }).addTo(map);
    // let selected_city = '台北市';
    $.getJSON('static/json/taiwanCities.geojson.json', data=>{
        let county_city = L.geoJSON(data.features, {
            style: function(d){
                if(d.properties.name === selected_city){
                    // $("p").text(d.properties.name);
                    return {color: 'red',
                            strokeWidth:2,
                            strokeColor: 'red',
                            // fillColor: '#f03',
                            fillOpacity: .08
                            };
                }
                else{
                    return {
                            color: 'red',
                            strokeWidth:2,
                            strokeColor: 'red',
                            fillOpacity: .08
                            };
                }
            }
        });
        county_city.addTo(map);
    });
    // for(let s = 2; s < all_city_name.length; s++){
    //     for(let i = 0; i < marker_data_a1[all_city_name[s]].length; i++){
    //         L.marker(marker_data_a1[all_city_name[s]][i],{icon: a1_icon}).addTo(map);
    //     }
    // }


    /***** markers grop *****/
    var markers = L.markerClusterGroup({ disableClusteringAtZoom: 16, chunkedLoading: true, chunkProgress: updateProgressBar });
    
    for(let s = 2; s < all_city_name.length; s++){
        for(let i = 0; i < marker_data_a1[all_city_name[s]].length; i++){
            let t = "title";
            markers.addLayer(L.marker(marker_data_a1[all_city_name[s]][i],{icon: a1_icon, title: t})); //將 L.mark(地標) 的圖層放到 makers 上面
        }
        for(let i = 0; i < marker_data_a2[all_city_name[s]].length; i++){
            let t = "title";
            markers.addLayer(L.marker(marker_data_a2[all_city_name[s]][i],{icon: a2_icon, title: t})); //將 L.mark(地標) 的圖層放到 makers 上面
        }
    }

    // for(let s = 2; s < all_city_name.length; s++){
    //     for(let i = 0; i < marker_data_a2[all_city_name[s]].length; i++){
    //         let t = "title";
    //         markers.addLayer(L.marker(marker_data_a2[all_city_name[s]][i],{icon: a2_icon, title: t})); //將 L.mark(地標) 的圖層放到 makers 上面
    //     }
    // }
    map.addLayer(markers); //將 markers 放到 map 的圖層上
    /***** markers grop *****/
        
}

