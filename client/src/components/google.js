import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import './socialButtons.css'
import { connect } from 'react-redux';
import { 
    CHANGE_LOGGED_IN_STATE,
    SET_CURRENT_PAGE,
    CHANGE_LOGGED_IN_TYPE,
} from 'reducers/types'
import store from 'store'
import { loadOrCreateUserIfNotExists } from 'actions/userActions.js'
import { useHistory } from "react-router-dom";

class GoogleButton extends Component {

    onsuccessGoogleLogin = (response) => {
        // If responseType is not 'code', callback will return the GoogleAuth object.
        // If responseType is 'code', callback will return the offline token for use on your server.

        console.log(response);
        this.props.dispatch({type: CHANGE_LOGGED_IN_TYPE, payload: "Google"});
        this.props.dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });

        if(this.props.pageAfterLogin !== undefined && this.props.pageAfterLogin != ''){
            this.context.history.push("/" + this.props.pageAfterLogin)            
        }
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

