const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/e57f968c83076d28bede76cea3837723/'+latitude+','+longitude

    request({url, json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }else if(body.error){
            callback('Location not found', undefined)
        }else{
            callback(undefined,body.daily.data[0].summary +' It is currently '+body.currently.temperature+' degrees out. The high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow+'. There is a '+body.currently.precipProbability+'% of rain.')
        }
    })
}

module.exports = forecast