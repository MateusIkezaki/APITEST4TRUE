async function getData()
        {
            const response = await fetch('/api')
            const answer = await response.json()
            console.log(answer)
            const chosenname = answer[answer.length - 1]
            const message = `hi, ${chosenname.nam}, your latitude is ${JSON.stringify(chosenname.lat)} and your
            longitude is ${JSON.stringify(chosenname.lon)}. Remember: for every second you're not running, I'm only getting closer :)`

            document.querySelector('.message').innerHTML = message

             for(item of answer){
                 //this loop is repeated for every element of the answer array

                 const root = document.createElement('div')
                 const name = document.createElement('div')
                 const location = document.createElement('div')
                 const time = document.createElement('div')
                 const weatherpreview = document.createElement('div')
                 const space = document.createElement('br')

                 name.textContent = `Name: ${item.nam}`
                 //inserting name of database in the '.name' div
                 location.textContent = `Location(latitude,longitude): ${item.lat}, ${item.lon}`
                 //inserting latitude and longitude of database in the '.location' div
                 weatherpreview.textContent = `Location's weather: ${item.weatherstate}`

                 const readableTime = new Date(item.timestamp).toLocaleDateString()
                 //converting the timestamp in the database to a readable string
                 time.textContent = `Posted at: ${readableTime}`
                 //inserting readable string in the '.time' div

                 root.append(name, location, time, weatherpreview, space)
                 //inserting all divs created into the root div
                 document.body.append(root)
                 //inserting the root div into the page's body
            }
        }   
        getData() 