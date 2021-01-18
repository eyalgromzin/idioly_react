import { 
    CHANGE_SHOW_LOGIN_STATE,
    SET_LOGGED_IN_USER_ID,
    SET_LOGGED_IN_USER_FIRST_NAME,
    SET_LOGGED_IN_USER_LAST_NAME,
    SET_LOGGED_IN_USER_EMAIL,
    CHANGE_LOGGED_IN_TYPE,
   } from 'reducers/types'
  
  const initialState = {
    isShowLogin: false,
    loggedInUserID: '',
	loggedInUserFirstName: '',
	loggedInUserLastName: '',
    email: '',
    pageAfterLogin: '', 
    loggedInWith: "NONE"
  };
    
  
  function reducer(state = initialState, action) {
    switch(action.type) {     
      case CHANGE_SHOW_LOGIN_STATE:
            return {
            ...state,
            isShowLogin: action.payload
            }    
        case SET_LOGGED_IN_USER_ID:
            return {
                ...state,
                loggedInUserID: action.payload
            };
        case SET_LOGGED_IN_USER_FIRST_NAME:
            return {
                ...state,
                loggedInUserFirstName: action.payload
            };
        case SET_LOGGED_IN_USER_LAST_NAME:
			return {
				...state,
				loggedInUserLastName: action.payload
            };
        case SET_LOGGED_IN_USER_EMAIL:
			return {
				...state,
				email: action.payload
            };
        case CHANGE_LOGGED_IN_TYPE:
			return {
				...state,
				loggedInWith: action.payload
			};
      default:
        return state;
    }
  }
  
  export default reducer;