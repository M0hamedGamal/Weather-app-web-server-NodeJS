/* To use NPM package make these steps
    1. Make sure you are into the project folder
    2. Open terminal
    3. Type --> npm init -y               // -y --> yes uses the default
    4. Type --> npm i request@2.88.0     // request@version  install request lib for HTTP request to allow us to import it          
*/
const request = require('request')
const fetch = require("node-fetch")

// Second Challenge
const geoCode = (address, callback) => {
    // this url from https://docs.mapbox.com/api/search/    down to: 'Example request: Forward geocoding' & copy link from first $ctrl
    // encodeURIComponent --> Save URL from crashing If the user entered special chars like this '?' .
    const secondUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2VteSIsImEiOiJja2FlNG1uYzIxMmtlMzFvOHpsZm52am1yIn0.756TiC4l5HNZvoMqwac49g&limit=1'   // Store url into variable 

    fetch(secondUrl)
        .then((response) => response.json())
        .then((data) => callback(undefined, {
            longitude: data.features[0].center[0],   // features --> array & [0] --> get first oject..... center --> array & [0] --> get first value  
            latitude: data.features[0].center[1],    // features --> array & [0] --> get first oject..... center --> array & [1] --> get second value
            location: data.features[0].place_name
        })   //  .. check url link
        ).catch((e) => {
            callback(undefined, {Error: 'Invalid address...'})
        })

    // request({ url: secondUrl, json: true }, (error, response) => {
    //     if (error) {
    //         callback('Cannot fetch the response!', undefined)  // Send msg as a 1st param of error & undefined as a param of data 
    //     } else {
    //         // Hint: Check structure of response before checking the code.
    //         callback(undefined, {
    //             longitude: response.body.features[0].center[0],   // features --> array & [0] --> get first oject..... center --> array & [0] --> get first value  
    //             latitude: response.body.features[0].center[1],    // features --> array & [0] --> get first oject..... center --> array & [1] --> get second value
    //             location: response.body.features[0].place_name
    //         })   //  .. check url link
    //     }
    // })
}

module.exports = geoCode