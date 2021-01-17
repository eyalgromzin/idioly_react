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

const mainLayout = function(props){
    return <div id="mainLayout">
        <Router>
            <div id="top bar">top bar Idioly</div>
            <br />
            <div id="buttons_layout">     
                <li><Link to="/">home </Link></li>
                <li><Link to="/texts">texts </Link></li>
                <li><Link to="/practice">practice </Link></li>
                <li><Link to="/words">words</Link></li>
            </div>
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