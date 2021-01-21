
export function add1ToWordCorrectAnswers(id, correctAnswersFieldName, onSuccess, onFail){
    fetch("http://localhost:9000/userWords/add1tocorrectanswer",{
      method: 'POST', 
      mode: 'cors',
      body: JSON.stringify({id: id, fieldName: correctAnswersFieldName}),   //if its not json.stringify, it fails with cors!!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
        onSuccess(res)
    }).catch(error => {
        onFail(error)
    })
}

/*
  headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
*/