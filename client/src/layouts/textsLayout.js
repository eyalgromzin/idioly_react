import { getTexts, getTextsByCriterias } from 'dbActions'
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export default function(props){
    let history = useHistory();

    const [readingTexts, setReadingTexts] = useState([]);
    const [error, setError] = useState("");
    const [level, setLevel] = useState("all");
    const [type, setType] = useState("all");

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

        //and then in text layout
        //useEffect(() => {
    //    console.log(location.pathname); // result: '/secondpage'
    //    console.log(location.search); // result: '?query=abc'
    //    console.log(location.state.detail); // result: 'some_value'
    // }, [location]);
    }

    return <div id="textsPage">
        text layout
        {error}
        <div id="textsFilterBar">            
            <select name="textLevel" id="textsLevelDropDOwn" onChange={onLevelChange}>
                <option value="all">Level</option>
                <option value="super_easy">Super Easy</option>
                <option value="easy">Easy</option>
                <option value="intermediate">Medium</option>
                <option value="advanced">Hard</option>            
            </select>
            <select name="textType" id="textsLanguageDropDOwn" onChange={onTypeChange}>
                <option value="all">Text type</option>
                <option value="story">Story</option>
                <option value="conversation">conversation</option>
                <option value="article">article</option>            
                <option value="lyrics">lyrics</option>            
            </select>
        </div>

        text list: 
        {           
            readingTexts.map(readingText => <div key={readingText.title} onClick={() => openText(readingText)}> {readingText.title}  </div>)
        }
    </div>
}