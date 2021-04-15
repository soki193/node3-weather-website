const request = require('request');

const geocode = (addres, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addres)}.json?access_token=pk.eyJ1Ijoic29raTE5MyIsImEiOiJja2s1emRhaHExem14MnVwY2Nkb21yZm5hIn0.n3-cJpEdhOAdLOEah7s41Q&limit=1`;
    
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to mapbox service!');
        } else if (!body.features.length) {
            callback('There is no place that you are searching for!')
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;