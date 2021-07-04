require('dotenv').config();

const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_FUSION_API_KEY);

exports.handler = async event => {
    try {
        const requestBody = JSON.parse(event.body);
        console.log('processing request with query body: ', typeof requestBody);

        let response = await client.search(requestBody);
        if (response && response.body) {
            console.log('hit');
            if (response.statusCode < 300) {
                console.log('Sucessfully retrieved data for search query: ', requestBody, 
                'with results: ', response.body);
            }
            return {
                statusCode: response.statusCode,
                body: response.body
            }
        }
    } catch(e) {
        console.log(e);
    }
}