import React, { Component } from 'react'
import './loginScreen.css'
// import FacebookButton from 'components/socialButtons/facebook'
import GoogleButton from 'components/google'
// import FacebookButton from 'components/facebook'
import { connect } from 'react-redux';
import { hideLogInScreen } from 'actions/commonActions'

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    closeLoginScreen = () => {
        console.log("clicked closeLoginScreen")
        hideLogInScreen();
    }
    
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeLoginScreen()
        }
    }

    render() {
        return (
            <div id="loginScreen" onClick={hideLogInScreen}>    
                <div id="loginContent" onClick={this.onLoginBlur} ref={this.setWrapperRef}>
                    <div id="mainLogoLoginContainer">
                        <div id="loginScreenMainLogo"> Idioly </div>
                    </div>
                    <div >  
                        <div className="LoginButtonContainer"> 
                            {/* <FacebookButton onLoginScreenFocus={this.onLoginScreenFocus} onLoginBlur={this.onLoginBlur} 
                                pageAfterLogin={this.props.pageAfterLogin} logInSuccessCallback={this.props.logInSuccessCallback} /> */}
                        </div>
                        <div className="LoginButtonContainer"> 
                            <GoogleButton onLoginScreenFocus={this.onLoginScreenFocus} onLoginBlur={this.onLoginBlur} 
                                pageAfterLogin={this.props.pageAfterLogin} logInSuccessCallback={this.props.logInSuccessCallback} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userID: state.commonReducer.loggedInUserID,
        pageAfterLogin: state.commonReducer.pageAfterLogin,
    }
}


export default connect(mapStateToProps)(LoginScreen);  //mapStateToProps


