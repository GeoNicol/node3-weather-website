const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/e57f968c83076d28bede76cea3837723/'+latitude+','+longitude

    request({url, json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }else if(body.error){
            callback('Location not found', undefined)
        }else{
            callback(undefined,body.currently.summary +'. It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% of rain.')
        }
    })
}

module.exports = forecast