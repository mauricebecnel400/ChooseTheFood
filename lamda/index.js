const yelp = require('yelp-fusion');
const clientID = 'aYWUATpRlcocYoNJ8HyXcA'; //not valid anymore
const clientSecret = 'uYRUW2ekfg97ho3SCKZVDUeiHByNFMS1t4ITpY0nl7Eudbc4QeoYsCSMDtxdjJux'; //Not valid anymore


exports.handler = (event, context, callback) => {
    const searchRequest = {
    term: event.term,
    latitude: event.latitude,
    longitude: event.longitude
    };

    yelp.accessToken(clientID, clientSecret).then(response=> {
        const client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response =>{
            const size = response.jsonBody.businesses.length;
            var randomNum = Math.floor(Math.random() * size); 
            const firstResult = response.jsonBody.businesses[randomNum];
            const stringResult = JSON.stringify(firstResult, null, 4);
            //console.log("SIZE: ", size);
            callback(null, stringResult);
        });
    }).catch( e => {
        console.log(e);
        callback(e, null);
    });
};