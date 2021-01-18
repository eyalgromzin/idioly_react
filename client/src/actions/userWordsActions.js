//user actions

import axios from 'axios';
import { 
  SET_USER_WORDS
} from 'reducers/types'
import store from 'store'

// //'Liked' / 'Created' 
export const getUserWordsFromDB = userID => dispatch => {
    console.log('sending post:  api/userWords/getUserWords/, userID: ' + userID)
    axios.post(`/api/userWords/getUserWords`,{userID})
    .then(res =>
      {
        console.log('got response from: /api/user/getUser');
      }
    );
  }