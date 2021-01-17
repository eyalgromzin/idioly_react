
export function getTexts(onSuccess, onFail){
    const axios = require('axios').default;
    console.log("getting initial reading texts")
    axios.get('http://localhost:9000/texts', {
        headers: { 
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    }).then(function (response) {
        onSuccess(response.data)
    }).catch(function (error){
        onFail(error)
    }).then(function (){
        // always executed
    });
}

export function getTextsByCriterias(language, level, type, onSuccess, onFail){
    const axios = require('axios').default;
    var apiPath = `http://localhost:9000/texts/criterias/${language}/${level}/${type}`
    console.log("getting reading texts by criterias: " + apiPath)
    axios.get(apiPath, {
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        } 
    }).then(function (response){
        onSuccess(response.data)
    }).catch(function (error) {
        onFail(error)
    }).then(function () {
        // always executed
    });
}
