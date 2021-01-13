
export function getTexts(onSuccess, onFail){
    fetch("http://localhost:9000/texts")
    .then(res => onSuccess(res))
    .catch(error => onFail(error))
}