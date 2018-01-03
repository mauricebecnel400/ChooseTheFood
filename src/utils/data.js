
const request = require('request');



export function getData(data, cb) {
    const searchRequest = {
        term: 'restaurants',
        latitude: data.location.latitude,
        longitude: data.location.longitude
    };
    request.post({url: "https://w4l385nu83.execute-api.us-west-1.amazonaws.com/Dev/business", form: JSON.stringify(searchRequest)}, function(error, response, body){
        if (!error) cb(body);
    });
}

export function getLocation(cb)  {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (postion) => {
            cb(postion.coords);
        });
    } else {
        //var input = prompt("Please enter your current zip code");
       console.log("Geolocaction not supported.");
    }
}
