


export function getTexts(onSuccess, onFail){   

    fetch('http://localhost:9000/texts', {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json()
    }).then(response => {
        onSuccess(response)
    }).catch(function (error){
        onFail(error)
    })
}

export function getTextsByCriterias(language, level, type, onSuccess, onFail){
    console.log("getting reading texts by criterias: " + apiPath)
    
    var apiPath = `http://localhost:9000/texts/criterias/${language}/${level}/${type}`
    fetch(apiPath)
    .then(response => {
        return response.json()
    }).then(response => {
        onSuccess(response)
    }).catch(function (error) {
        onFail(error)
    })
}

export function getHtmlFromUrl(url, onSuccess, onFail){
    fetch(`http://localhost:9000/texts/gethtml/`,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url}),       
    }).then(function(response) {
        console.log('got response from getHtml' + response)
        onSuccess(response)
    }).catch(function(error) {
        onFail(error)
    });
}

export function addTextToDB(language, title, author, level, type, source, youtubeLink, text, wordCount, createdBy, onSuccess, onFail){
    var textOnject = {
        language: language,
        title: title,
        author: author,
        level: level,
        type: type,
        source: source,
        youtubeLink: youtubeLink,
        text: text,
        wordCount: wordCount,
        createdOn: Date.now(),
        createdBy: createdBy
    }

    var postUrl = `http://localhost:9000/texts/create/`
    console.log("adding text to db: " + postUrl)
    fetch(postUrl,{
        method: 'post',
        body: JSON.stringify(textOnject),
        headers: {
            'Content-Type': 'application/json'
          },
    }).then(function(response) {
        console.log("added text to db")
        onSuccess(response)
    }).catch(function(error) {
        console.log("fialed to add text to db")
        onFail(error);
    });
}