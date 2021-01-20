
export function getTodaysDateString(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let dateToday = dd + '/' + mm + '/'  + yyyy

    return dateToday
}

export const MAX_TRANSLATIONS_TILL_LOGIN = 10000

export const trimRight = function(str, charlist) {
    if (charlist === undefined)
      charlist = "\s";
  
    return str.replace(new RegExp("[" + charlist + "]+$"), "");
  };

export const trimLeft = function(str, charlist) {
    if (charlist === undefined)
      charlist = "\s";
  
    return str.replace(new RegExp("^[" + charlist + "]+"), "");
  };    


  export const isTextExistsInText = (text, largerText) => {
    var textWords = text.split(/[\s\t,\n"'\(\)\-\!\?]+/)
    var largerTextWords = largerText.split(/[\t\s,\n"'\(\)\-\!\?]+/)
    
    var numOfWordsToCheck = textWords.length / 4

    if(numOfWordsToCheck > 10){
      numOfWordsToCheck = 10
    }

    var wordsToFindInLargerText = []
    
    for(let i =0; i< numOfWordsToCheck; i++){
      let wordIndex = Math.floor(Math.random() * textWords.length);
      while(wordsToFindInLargerText.indexOf(textWords[wordIndex]) != -1){
        wordIndex = Math.floor(Math.random() * textWords.length)
      }
      wordsToFindInLargerText.push(textWords[wordIndex])
    }

    wordsToFindInLargerText.forEach(wordToFindIndex => {
      if(largerTextWords.indexOf(wordToFindIndex) == -1) return false
    })

    return true    
  }