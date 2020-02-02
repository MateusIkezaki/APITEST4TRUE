//NOTE: in order to use fetch in a node.js app you need to type 'npm install node-fetch' on the terminal

const express = require('express')
//importing express package
const app = express()
//define app as express
const fetch = require('node-fetch')
//pulling fetch from node-fetch

const Datastore = require('nedb')
//import nedb

const database = new Datastore('dingo.db');
//creating database dingo.db
database.loadDatabase();
//loading/creating database

const fs = require("fs");

app.listen(3000, () => console.log('listening at 3000'))
//create server listen at port 3000, if successful log

app.use(express.static('public'))
//app will display content in the 'public' folder, in our case the index.html

app.use(express.json({limit: '10mb'}))
//receive and understand json files. limit function limits response size



app.get('/api', (request, response) => {
    //this function sets up a route expecting a get, which will return the data as response.json()
    database.find({}, (err, data) => {
    //this function tells the database to get the data 
        if(err){
            response.end()
            return
        }
        response.json(data)
        //returning the data to the request
    })
    
})

app.post('/api', (request, response) => {
    /*this function sets up a route expecting a post, first argument is the address, second is the function
    two arguments within the function: request and response
    request variable holds all the data(body from the options constant in the index.html file)
    response variable will send info to client*/
   
    const timestamp = Date.now()
    request.body.timestamp = timestamp
    database.insert(request.body)
    response.json(request.body)
    //send back "success", lat and lon as response 
})

app.get('/airquality/:latlon', async(request, response) =>{
    const latlon = request.params.latlon.split(',')
    const lat = latlon[0]
    const lon = latlon[1]
})

app.get('/weather/:latlon', async (request, response) => {
    //this get is expecting a parameter(latlon) for the weather route
    const latlon = request.params.latlon.split(',')
    //the latlon const equals the latlon parameter split into to at the ,
    const lat = latlon[0]
    //the first half of latlon is lar
    const lon = latlon[1]
    //second half is lon

    const apiURL = `https://api.darksky.net/forecast/49c6134df4526546584419102e838221/${lat},${lon}`
    //the api can use coordinates to determine the user's location, thus we used the constants defined previously to get the Sao Paulo's api
    const rawapidata = await fetch(apiURL)
    //the data from the SP api will be stored inside rawapidata
    const processedapidata = await rawapidata.json()
    //the json version of the data inside rawapidata will be stored inside processedapidata

    const url = `https://api.openaq.org/v1/latest?coordinates=40.73,-73.99`
    const airqualityrawdata = await fetch(url)
    const airqualityprocesseddata = await airqualityrawdata.json()

    const sendjson = {
        firstapi: processedapidata,
        secondapi: airqualityprocesseddata
    }

    response.json(sendjson)
    //return response as json of processedapidata
})

