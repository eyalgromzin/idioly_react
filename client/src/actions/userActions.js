//user actions

import axios from 'axios';
import { 
  SET_LOGGED_IN_USER, 
  SET_LOGGED_IN_USER_FIRST_NAME, 
  SET_LOGGED_IN_USER_ID, 
  SET_LOGGED_IN_USER_LAST_NAME, 
  CHANGE_LOGGED_IN_STATE,
  CHANGE_LOGGED_IN_TYPE,
  SET_LOGGED_IN_USER_EMAIL,
} from 'reducers/types'
import store from 'store'

//works till the return
export const loadOrCreateUserIfNotExists = user => dispatch => {
  console.log('in loadOrCreateUserIfNotExists beginning:' + user)
  var isUserExists = false;
  console.log('sending get request: api/user/' + `${user.id}`);
  
  axios.get(`/api/user/${user.id}`).then(res => {  // => dispatch => 
    console.log('found: ' + res.data.length + ' users')
    // return res.data;
    if(res.data.length == 0){
        console.log('sending post: /api/user/create')
        
        console.log('userObject: ' + JSON.stringify(user))
        axios.post(`/api/user/create`,user)
        .then(res => {
          console.log('sent post: api/user/create: ' + user)
          dispatch({
            type: SET_LOGGED_IN_USER_ID,
            payload: res.data.id
          })
          dispatch({
            type: SET_LOGGED_IN_USER_FIRST_NAME,
            payload: res.data.firstName
          })
          dispatch({
            type: SET_LOGGED_IN_USER_LAST_NAME,
            payload: res.data.lastName
          })
          dispatch({
            type: SET_LOGGED_IN_USER_EMAIL,
            payload: res.data.email
          })
          dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });
        });
      // };
    }else{
      console.log('user exists, updating store')
          dispatch({
            type: SET_LOGGED_IN_USER_ID,
            payload: res.data[0].id
          })
          dispatch({
            type: SET_LOGGED_IN_USER_FIRST_NAME,
            payload: res.data[0].firstName
          })
          dispatch({
            type: SET_LOGGED_IN_USER_LAST_NAME,
            payload: res.data[0].lastName
          })
          dispatch({
            type: SET_LOGGED_IN_USER_EMAIL,
            payload: res.data[0].email
          })
          dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });

          dispatch(getUserFromDB(user.id))
    }
  }).then(res => {

  })
  .catch(error => 
    console.log('error: ' + error));
}

export const createUser = user => dispatch => {
  console.log('in userActions->create user')
  
  console.log('sending post: api/user/create:' + user)
  axios.post(`/api/user/create`,user)
  .then(res =>
    {
      console.log('sent post: api/user/create:' + res.data)
      dispatch({
        type: SET_LOGGED_IN_USER,
        payload: res.data
      })
    }
  );
}

// //'Liked' / 'Created' 
export const getUserFromDB = userID => dispatch => {
  console.log('sending post:  api/user/getUser/, userID: ' + userID)
  axios.post(`/api/user/getUser`,{userID})
  .then(res =>
    {
      console.log('got response from: /api/user/getUser');
    }
  );
}

export const changeLoggedInWithType = (newType) => {
  store.dispatch({
    type: CHANGE_LOGGED_IN_TYPE,
    payload: newType
  })
}



