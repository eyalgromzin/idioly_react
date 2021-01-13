import { getTexts } from 'dbActions'
import React, { useState, useEffect } from 'react';

export default function(props){
    const [readingTexts, setReadingTexts] = useState([]);

    useEffect(() => {
        getTexts(texts => {
            setReadingTexts(texts)
        }, error => {
            setReadingTexts(error)
        })
    }, []);

    return <div id="textsPage">
        text layout
        <div id="textsFilterBar">
            <select name="language" id="textsLanguageDropDOwn">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Portuguese">Portuguese</option>            
            </select>
            <select name="level" id="textsLevelDropDOwn">
                <option value="superEasy">Super Easy</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>            
            </select>
        </div>

        text list: 
        {readingTexts}
    </div>
}