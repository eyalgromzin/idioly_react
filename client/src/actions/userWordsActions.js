//user actions

import axios from 'axios';
import { 
  SET_USER_WORDS,
  ADD_USER_WORD
} from 'reducers/types'
import store from 'store'


export const getUserWordsFromDB = (userID, onSuccess, onFail) => {
    console.log('sending post:  api/userWords/getUserWords/' + userID)
    axios.get(`http://localhost:9000/userWords/getUserWords/${userID}`)
    .then(res =>
      {
        onSuccess(res)
        console.log('got response from: /api/user/getUser');
      }
    ).catch(error => {
        onFail(error)
    });
  }

export const addUserWordToDB = (userID, fromLanguage, toLanguage, word, translation, sentence, onSuccess, onFail) => {
    console.log('sending post:  api/userWords/addUserWord/')
    console.log(`userID: ${userID}, fromLanguage: ${fromLanguage}, toLanguage: ${toLanguage}, word: ${word}, translation: ${translation}, sentence: ${sentence}`)
    axios.post(`http://localhost:9000/userwords/adduserword`,{userID, fromLanguage, toLanguage, word, translation, sentence})
        .then(res =>
        {
            console.log('added word to user words table')
            onSuccess(res.data)
        }
        ).catch(error => {
            console.log('failed to add word to userWords')
            onFail(error)
        }
    );
  }
  
  export const deleteUserWord = (wordID, onSuccess, onFail) => {
    console.log('sending post:  api/userWords/deleteUserWord/' + wordID)
    axios.get(`http://localhost:9000/userWords/deleteUserWord/${wordID}`)
    .then(res =>
      {
        onSuccess(res)
        console.log('deleted user word with id: ' + wordID);
      }
    ).catch(error => {
        onFail(error)
    });
  }

  export const addWordToUserWords = (userWord) => {
    store.dispatch({type: ADD_USER_WORD, payload: userWord});
  }