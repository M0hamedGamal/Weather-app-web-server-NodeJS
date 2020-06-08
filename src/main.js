/* To use express & handlebars make these steps
    1. Make sure you are into the project folder
    2. Open terminal
    3. Type --> npm init -y               // -y --> yes uses the default
    4. type --> npm i express@4.18.4      // i --> install
    5. type --> npm i hbs@4.0.1      // i --> install   hbs --> handlebars

    6. Use nodemon instead of node to always update without stop running server & run it again
    7. If you need to auto update to js & hbs files  type in termnal    nodemon  'File.js'  -e js,hbs
    8. URL is --> localhost:3000    this is a root page
*/
const geoCode = require('./utils/geoCode')

const path = require('path')    // Get path of Directory
const express = require('express')  // Import express lib for web server
const hbs = require('hbs')          // Import hbs lib for web server

const app = express()   // Add all of express methods into app var

// console.log(path.join(__dirname,'../public'))   // Just test to Check This path 

// path is '/NodeJS Projects/07-Web-server/public' that what i want to reach
const publicDirectoryPath = path.join(__dirname, '../public') // __dirname --> path of the folder that you already in

// path is '/NodeJS Projects/07-Web-server/templates/views' that what i want to reach
const viewsDirectoryPath = path.join(__dirname, '../templates/views') // __dirname --> path of the folder that you already in

// path is '/NodeJS Projects/07-Web-server/templates/partials' that what i want to reach
const partialsDirectoryPath = path.join(__dirname, '../templates/partials') // __dirname --> path of the folder that you already in

// setup handle bars engine & views location
app.set('views', viewsDirectoryPath)   // 'views' --> internal      Go to path of folder views
app.set('view engine', 'hbs')   //  'view engine' --> internal      to allow hbs --> handlebars
hbs.registerPartials(partialsDirectoryPath)     // register Partials files into this path

app.use(express.static(publicDirectoryPath))     // run HTML & Css files from public folder

app.get('', (req, res) => {     // '' --> route of home page     req --> request     res --> response
    res.render('index', {            // res.render   -->  render work with hbs files into views folder   index --> name of file
        title: 'Home Page',     // will use this property into index.hbs
        name: 'Created by Gemy' // will use this property into index.hbs
    })
})

app.get('/help', (req, res) => {    // '/help' --> route of help page     req --> request     res --> response
    res.render('help', {            // res.render   -->  render work with hbs files into views folder   help --> name of file
        title: 'Help Page',
        name: 'Created by Gemy'
    })
})

app.get('/weather', (req, res) => {     // '/weather' --> route of help page     req --> request     res --> response   Don't forget you're the server now so use res  not  req

    console.log(req.query)              // req.query print an Object of requests from user

    if (!req.query.address) {           // query get from http://localhost:3000/weather?address=New York  ? --> where condition    address=Egypt --> query     
        // return to stop function to avoid error from using 2 response of the same request
        return res.send({                      // res.send   -->  send response from server to client
            Error: 'You must provid an address!'
        })  // Json response
    }

    geoCode(req.query.address, (error, data) => {   // Params are --> country name & Callback
        if (error)
            res.send({ Error: error })              // res.send   -->  send response from server to client
        else
            res.send(data)         // res.send   -->  send response from server to client
    })  // Json response

})

app.get('*', (req, res) => { // '*' --> Any page that you don't have it or created above like http://localhost:3000/what     what is page not listed into our project
    res.render('404', {            // res.render   -->  render work with hbs files into views folder   404 --> name of file
        title: 'Error 404 Page',
        name: 'Created by Gemy',
        errorMsg: 'Page not found! :('
    })
})

app.listen('3000', () => {  // app.listen --> start to listen every change      3000 --> is a port
    console.log('Server is starting on port 3000...')    // terminal msg to make sure that server work correctly
})