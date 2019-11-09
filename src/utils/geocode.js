const request = require('request');

const geocode = (location , callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoibmlra2lrIiwiYSI6ImNrMmRkYnMxaDNjZ3MzZ216dmF1b3IybmIifQ.m57DGCV9aa_SSdEVKf0gTw&limit=1`
    request({url,json:true},(err, {body})=> {
        if (err) {
            callback('Unable to connect to location service', undefined)
        } else if (!body.features.length) {
            callback('Unable to find location, Try another search', undefined)
        } else {
            const data = body.features[0];
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });

        }
    })
}

module.exports = geocode;
