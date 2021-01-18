
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