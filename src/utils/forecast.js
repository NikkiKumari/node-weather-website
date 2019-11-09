const request = require('request');

const forecast =(lat , long, callback)=>{
    const url = `https://api.darksky.net/forecast/67d366c3a7a5ad148c367835a3f9afcb/${lat},${long}`;
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to waether app', undefined)
        }else if(body.error){
            callback('unable to find location', undefined);
        }else {
            console.log('body', body.data);
            callback(undefined, {
                currently : body.currently
            });
        }
    });
};
module.exports = forecast;