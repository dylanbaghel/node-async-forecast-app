const request = require('request');

const getForecast = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/PASTE_YOUR_DARKSKY_API_KEY/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable To Connect To The Forecast Servers');
        } else if (body.code === '400') {
            callback('Unable To find forecast for given location');
        } else if (response.statusCode == 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                summary: body.currently.summary
            });
        }
    });
};

module.exports.getForecast = getForecast;;