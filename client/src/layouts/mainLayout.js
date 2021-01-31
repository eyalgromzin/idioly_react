import TextsLayout from 'layouts/textsLayout'
import PracticeLayout from 'layouts/practiceLayout'
import HomeLayout from 'layouts/homeLayout'
import WordsLayout from 'layouts/wordsLayout'
import TextLayout from 'layouts/textLayout'
import AddText from 'layouts/addTextLayout'
import LoginScreen from 'layouts/loginScreen'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link } from 'react-router-dom';
import './layouts.css'
import { useSelector } from 'react-redux'

export default function MainLayout(){
    const isShowLogin = useSelector(state => {
        return state.commonReducer.isShowLogin
    })

    return <div id="mainLayout">        
            { isShowLogin? <LoginScreen /> : ""}            

            <Router>
                <div id="topBar">
                    <div id="topBarLogo">
                        <img id="topBarLogoImage" src={require("images/logo.png").default} /> 
                        <span id="topBarIdioly">Idioly</span>
                    </div>

                    <div id="topBarButtons">     
                        <div class="topBarButtonContainer"><Link to="/texts"><div className="topBarButton">texts </div></Link></div>
                        <div class="topBarButtonContainer"><Link to="/practice"><div className="topBarButton">practice </div></Link></div>
                    </div>

                    <div id="topBarRightPlaceholder"></div>
                    
                </div>
                
                <div id="mainContentContainer">
                    <Switch>
                        <Route path="/text" >
                            <TextLayout />
                        </Route>
                        <Route path="/addtext" >
                            <AddText />
                        </Route>
                        <Route path="/texts" >
                            <TextsLayout />
                        </Route>
                        <Route path="/practice" > 
                            <PracticeLayout />
                        </Route>
                        <Route path="/words" > 
                            <WordsLayout />
                        </Route>
                        <Route path="/" >   {/* needs to be last */}
                            <HomeLayout />
                        </Route>
                    </Switch>
                </div>
            </Router>
       
    </div>
}