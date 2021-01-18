
export function getTodaysDateString(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let dateToday = dd + '/' + mm + '/'  + yyyy

    return dateToday
}

export const MAX_TRANSLATIONS_TILL_LOGIN = 10000

export var isLoggedIn = false

export var fromLanguage = "es"
export var toLanguage = "en"

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