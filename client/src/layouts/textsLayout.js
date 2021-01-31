import { showLogInScreen } from 'actions/commonActions';
import { getTextsByCriterias } from 'actions/textsActions'
import {getTexts} from 'actions/textsActions'
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function(props){
    let history = useHistory();

    const [readingTexts, setReadingTexts] = useState([]);
    const [error, setError] = useState("");
    const [level, setLevel] = useState("all");
    const [type, setType] = useState("all");

    const isLoggedIn = useSelector(state => { 
        return state.commonReducer.loggedInWith != "NONE"
    })

    const language = "Spanish"

    useEffect(() => {
        getTexts(texts => {
            setReadingTexts(texts)
        }, error => {
            setError(error)
        })
    }, []);

    var onLevelChange = function(event){
        setLevel(event.target.value);

        getTextsByCriterias(language, event.target.value, type, texts => {
            setReadingTexts(texts)
        }, error => {
            setError(error)
        })
    }   
    
    var onTypeChange = function(event){
        setType(event.target.value);

        getTextsByCriterias(language, level, event.target.value, texts => {
            setReadingTexts(texts)
        }, error => {
            setError(error)
        })
    }   

    var openText = function(readingText){
        history.push({
            pathname: '/text',
            search: '?query=abc',
            state: { readingText: readingText }
        });
    }

    var openAddTextLayout = function(){
        if(isLoggedIn){
            history.push({
                pathname: '/addText',  
            });
        }else{
            showLogInScreen()
        }
    }

    return <div id="textsPage">
        {error}
        <div id="textsFilterBar">            
            <select name="textLevel" id="textsLevelDropDOwn" onChange={onLevelChange}>
                <option value="all">Level</option>
                <option value="super_easy">Super Easy</option>
                <option value="easy">Easy</option>
                <option value="intermediate">Medium</option>
                <option value="advanced">Hard</option>            
            </select>
            <select name="textType" id="textsLanguageDropDown" onChange={onTypeChange}>
                <option value="all">Text type</option>
                <option value="story">Story</option>
                <option value="conversation">conversation</option>
                <option value="article">article</option>            
                <option value="lyrics">lyrics</option>            
            </select>
            <div id="addTextButton" onClick={() => openAddTextLayout()}>Add text </div>
        </div>
        <div id="textsList">
        {           
            readingTexts.map(readingText => <div class="textListItem" key={readingText.title} onClick={() => openText(readingText)}> {readingText.title}  </div>)
        }
        </div>
    </div>
}