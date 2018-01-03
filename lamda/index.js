const clientID = 'aYWUATpRlcocYoNJ8HyXcA';
const clientSecret = 'uYRUW2ekfg97ho3SCKZVDUeiHByNFMS1t4ITpY0nl7Eudbc4QeoYsCSMDtxdjJux';

const searchRequest = {
    term: 'restaurants',
    location: 'rohnert park, ca'
};

exports.handler = (event, context, callback) => {
    yelp.accessToken(clientID, clientSecret).then(response=> {
        const client = yelp.client(response.jsonBody.access_token);

        client.search(searchRequest).then(response =>{
            const firstResult = response.jsonBody.businesses[0];
            const stringResult = JSON.stringify(firstResult, null, 4);
            console.log(stringResult);
            callback(null, stringResult);
            
        });
    }).catch( e => {
        console.log(e);
        callback(e, null);
    });
};