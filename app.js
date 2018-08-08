const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const request = require('request');
const forecast = require('./forecast/forecast');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Access Weather from API',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (error, results) => {
    if (error) {
        console.log(error);
    } else {
        console.log(results.address);
        forecast.getForecast(results.latitude, results.longitude, (error, forecast) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`It's Currenty ${forecast.temperature} Farahneit. It's ${forecast.summary}.`);
            }
        });
    }
});


