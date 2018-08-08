const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const request = require('request');
const forecast = require('./forecast/forecast');

//DARk sky key - ef5fbbb06f3e965fbec11088d13a2f68

//DARK SKY STATic - https://api.darksky.net/forecast/ef5fbbb06f3e965fbec11088d13a2f68/26.2182871,78.18283079999999

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


