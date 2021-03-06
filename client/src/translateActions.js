

//
export function translateWord(word, fromLanguage, toLanguage, onSuccess, onFail){
    const axios = require('axios').default;
    const { v4: uuidv4 } = require('uuid');

    var subscriptionKey = "4cf20fe539014953b8a5dacf6730f93b";
    var endpoint = "https://api.cognitive.microsofttranslator.com";

    // Add your location, also known as region. The default is global.
    // This is required if using a Cognitive Services resource.
    var location = "westeurope";

    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': fromLanguage,
            'to': toLanguage
        },
        data: [{
            'text': word
        }],
        responseType: 'json'
    }).then(function(response){
        if(response.data[0].translations[0].text == ""){
            onFail("Failed to translate word")
        }else{
            onSuccess(response.data[0].translations[0].text)
        }
    }).catch(error => {
        onFail(error)
    })
}