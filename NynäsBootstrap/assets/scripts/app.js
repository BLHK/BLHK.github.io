'use strict';
//node app.js

var city= "nynashamn";
const APIKEY = '7d5d0e7cee455a602f8cd6b91d00baf3';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid='
+ APIKEY;


//tar emot url:en och skickar en request
function HttpGet(url) {
    this.url=url;
    this.ajax = new XMLHttpRequest();
}

HttpGet.prototype.proceed = function(callback){
    this.ajax.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) { //Kollar ifall vi är färdiga  
            callback(this.response); 
        }
    }
    this.ajax.open('GET', this.url, true);
    this.ajax.send();
}

//För att hämta url
function fetch(url) {
    return new HttpGet(url);
}


fetch(API_URL).proceed(response => {
    var weatherData = JSON.parse(response);
    var weatherList = weatherData.list;
    var lista = document.getElementById('weatherTable');
    var tbody = document.createElement('tbody');

    
    //Antal kolumner som skrivs ut, varav index är från vilken tidpunkt som skrivas ut. (5 = till vilken slutpunkt)
    for(var index = 0; index < 5; index++) { 
        var time = weatherList[index].dt_txt; //Hämtar in texten
        var date = new Date(time);
        var hour = date.getHours(); //Hämtar in vilken timma det är
            if(hour == "0"){
                hour += "0:00";
            }else{
                hour += ":00";
            }
        var weather = weatherList[index].weather[0].description; //Vad det blir för väder
        var temp =  weatherList[index].main.temp; // Vad det blir för tempratur
        var wind = weatherList[index].wind.speed; // Vad det blir för vindhastighet
        

        var row = document.createElement('tr');

        var c1 = document.createElement('td');
        var c2 = document.createElement('td');
        var c3 = document.createElement('td');
        var c4 = document.createElement('td');

        c1.innerHTML = hour;
        c2.innerHTML = (weather).charAt(0).toUpperCase() + weather.substr(1);
        c3.innerHTML = (temp-273.15).toFixed(1) + '°C';
        c4.innerHTML = wind.toFixed(1) + 'm/s';

        lista.appendChild(tbody);
        tbody.appendChild(row);
        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);
        }
    }
);


var trains = [
    {
        trainNR: '42',
        leaves: '15:00',
        arrives: '15:45'
    },
    {
        trainNR: '42',
        leaves: '15:00',
        arrives: '15:45'
    },
    {
        trainNR: '42',
        leaves: '15:00',
        arrives: '15:45'
    },
    {
        trainNR: '999',
        leaves: '22:00',
        arrives: '22:45'
    }
];

document.getElementById("btn").addEventListener("click", trainSearch);
document.getElementById("textbar").addEventListener("keydown", function(e){
    if(e.keyCode == 13){
        trainSearch();
    }
});

function trainSearch(){
    var departsFrom = document.getElementById("textbar").value;
    var akerFran = document.getElementById("akerFran");
    //Set så att departsFrom = "Åker från: " + akerFran

    document.getElementById("akerFran").innerHTML = "Åker ifrån: " + departsFrom;

    var lista = document.getElementById('trainTable');
    var tbody = document.createElement('tbody');

    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }

    for(var i = 0; i < trains.length; i++){
        var row = document.createElement('tr');

        var c1 = document.createElement('td');
        var c2 = document.createElement('td');
        var c3 = document.createElement('td');

        c1.innerHTML = trains[i].trainNR;
        c2.innerHTML = trains[i].leaves;
        c3.innerHTML = trains[i].arrives;

        lista.appendChild(tbody);
        tbody.appendChild(row);
        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
    }
}
