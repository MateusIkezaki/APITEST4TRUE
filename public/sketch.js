
        let lat, lon
        if('geolocation' in navigator)
        {
            console.log('working')
            navigator.geolocation.getCurrentPosition(async position => {
             try{
                //the try method tries the execute what's inside it, if something goes wrong it moves to the catch method
                
                lat = position.coords.latitude
                lon = position.coords.longitude
               const button = document.getElementById("botao")
               
               const apiURL = `weather/${lat},${lon}`
               //look for weather server with lat and lon as parameters
               const apirawdata = await fetch(apiURL)
               //store data attained from weather server inside response
               const json = await apirawdata.json()
               //store json of data from response into json constant
   
               console.log(json)
               //print json constant
   
               button.addEventListener('click', async event => {
                   const nam = document.getElementById("userinput").value
                   const weatherstate = json.firstapi.hourly.summary
                   const airquality = json.secondapi.results[0].measurements[0].value
                   console.log(weatherstate)
                   const data = {lat, lon, nam, weatherstate, airquality}
                   
                   document.getElementById("latitude").textContent = lat
                   document.getElementById("longitude").textContent = lon
   
                   const options = {
                       method: 'POST',
                       headers: {
                           'Content-Type': 'application/json'
                           //specifying to the api what type of content it is
                       },
                       body: JSON.stringify(data)
                       //parsing data from data
                   }
                   const response = await fetch('/api', options)
                   //accessing link(in this case the api named api), with POST method, sending the body variable
                   const result = await response.json();
                   //await for response.json() from app.js file
                   console.log(result)
                   //print result
               })
             }catch{
                console.log('error')
            }
                
            
            })
            
        }
        else
        {
            console.log('done fucked up')
        }

