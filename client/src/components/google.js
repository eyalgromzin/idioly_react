import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import './socialButtons.css'
import { connect } from 'react-redux';
import { 
    CHANGE_LOGGED_IN_STATE,
    CHANGE_LOGGED_IN_TYPE,
    SET_LOGGED_IN_USER_ID,
    SET_LOGGED_IN_USER_FIRST_NAME,
    SET_LOGGED_IN_USER_LAST_NAME,
    SET_LOGGED_IN_USER_EMAIL,
    SET_LOGGED_IN_USER_WORDS,
} from 'reducers/types'
import store from 'store'
import { loadOrCreateUserIfNotExists } from 'actions/userActions.js'
import { useHistory } from "react-router-dom";
import { getUserWordsFromDB } from 'actions/userWordsActions';

class GoogleButton extends Component {

    onsuccessGoogleLogin = (response) => {
        // If responseType is not 'code', callback will return the GoogleAuth object.
        // If responseType is 'code', callback will return the offline token for use on your server.

        console.log(response);
        this.props.dispatch({type: CHANGE_LOGGED_IN_TYPE, payload: "Google"});
        this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });
        this.props.dispatch({ type: SET_LOGGED_IN_USER_ID, payload: response.googleId });
        this.props.dispatch({ type: SET_LOGGED_IN_USER_FIRST_NAME, payload: response.Nt.EW });
        this.props.dispatch({ type: SET_LOGGED_IN_USER_LAST_NAME, payload: response.Nt.IU });
        this.props.dispatch({ type: SET_LOGGED_IN_USER_EMAIL, payload: response.Nt.uu });

        if(this.props.pageAfterLogin !== undefined && this.props.pageAfterLogin != ''){
            this.context.history.push("/" + this.props.pageAfterLogin)            
        }

        getUserWordsFromDB(response.googleId, res => {
            this.props.dispatch({ type: SET_LOGGED_IN_USER_WORDS, payload: res.data });
        }, error => {
            alert(error)
        })
    }

    onFailGoogleLogin = (response) => {
        this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: false });
        console.log(response);
    }

    render() {
        return (
        <div>
            <GoogleLogin
                clientId="961387820511-gnr9u3o9qls8663npvioavj8ajk6081r.apps.googleusercontent.com"
                buttonText="Login with Google"
                className="socialButton"
                onSuccess={this.onsuccessGoogleLogin}
                // onFocus={this.props.onLoginScreenFocus}
                // onBlur={this.onLoginBlur}
                onFailure={this.onFailGoogleLogin}
            />
        </div>
        )
    }
}

export default connect()(GoogleButton);

