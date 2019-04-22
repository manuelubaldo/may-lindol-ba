var API = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

navigator.geolocation.getCurrentPosition(success,error);


function success(data){
    console.log(data);
    var coordinates = data.coords;
    var currentDate = new Date();
    currentDate.setHours(currentDate.getHours()-1);
    var passHour = currentDate.toISOString();
    checkEarthquake(coordinates.latitude,coordinates.longitude,200,passHour);
}

function error(error){
    console.log(error);
    if (error.code == 1) {
        alert("Please allow Geolocation.");
    }
    else{
        alert("Unable to get your location.");
    }
}

function checkEarthquake(lat,long,radiuskm,starttime){
    var url = API + '&latitude='+ lat + '&longitude=' + long + '&maxradiuskm=' + radiuskm + '&starttime=' + starttime;
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        if (data.features.length > 0) {
            document.getElementById('result').innerText = "MERON";
        }
        else{
            document.getElementById('result').innerText = "WALA";
        }
    })
    .catch(function(error){
        alert('Unable to check Earthquake real-time data.')
    })
}
