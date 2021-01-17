import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function(props){
    const location = useLocation();
    
    const selectWord = function(wordTag){
        //...
        var x = 4
        x += 2
    }

    const clickCallback = function(e, wordTag){
        selectWord(wordTag)        
        var x = 4
        x += 2
    }

    return <div id="textContent">        
        {/* <span style="white-space: pre-line"></span> */}
        {/* <textarea id="textText">{location.state.readingText.text}</textarea> */}
        {location.state.readingText.text.split(" ").map(word => <span onClick={(e) => clickCallback(e, this)}>{word}</span> )
        }
  );
    </div>
}