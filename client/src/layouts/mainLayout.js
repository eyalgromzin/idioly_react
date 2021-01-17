import TextsLayout from 'layouts/textsLayout'
import PracticeLayout from 'layouts/practiceLayout'
import HomeLayout from 'layouts/homeLayout'
import WordsLayout from 'layouts/wordsLayout'
import TextLayout from 'layouts/textLayout'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link } from 'react-router-dom';
import './layouts.css'

const mainLayout = function(props){
    return <div id="mainLayout">
        <Router>
            <div id="topBar">
                <img id="topBarLogoImage" src={require("images/logo.png").default} /> 
                <span id="topBarIdioly">Idioly</span>
                
            </div>
            <div id="buttons_layout">     
                <li class="topBarButton"><Link to="/texts">texts </Link></li>
                <li class="topBarButton"><Link to="/practice">practice </Link></li>
                <li class="topBarButton"><Link to="/words">words</Link></li>
            </div>
            <br />
            
            <Switch>
                    <Route path="/text" >
                        <TextLayout />
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
        </Router>
    </div>
}

export default mainLayout