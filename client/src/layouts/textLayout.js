import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import WordDialog from 'components/wordDialog'


export default function(props){
    const location = useLocation();
    const [textWords, setTextWords] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    
    // const wordDialogRef = useRef();
    const wordDialogRef = React.createRef();

    useEffect(() => {
        setTextWords(location.state.readingText.text.split(" "))
    }, [])

    const selectWord = function(wordTag){
        //...
        var x = 4
        x += 2
    }

    const addWordDialogButtonClicked = (word, translation) => {
        alert(word + " " + translation)
    }

    const closeWordDialog = (word) => {
        wordDialogRef.current.imperatoveHandleOpen("Add word")
    }

    const trimRight = function(str, charlist) {
        if (charlist === undefined)
          charlist = "\s";
      
        return str.replace(new RegExp("[" + charlist + "]+$"), "");
      };

    const trimLeft = function(str, charlist) {
        if (charlist === undefined)
          charlist = "\s";
      
        return str.replace(new RegExp("^[" + charlist + "]+"), "");
      };

    const wordClickEvent = function(e, wordTag){
        e.target.style.backgroundColor = 'yellow';
        var word = e.target.textContent.trim();
        var charlist = "\, \.";       
        word = trimRight(word,charlist)
        word = trimLeft(word,charlist)
        wordDialogRef.current.imperatoveHandleOpen("Add word", word)    //open word dialog
        selectWord(wordTag)       
    }

    return <div id="textContent">        
        {
            textWords.map( word => <span onClick={(e) => wordClickEvent(e, this)}>{word} </span> )
        }
        <WordDialog ref={wordDialogRef} buttonClicked={(word, translation) => addWordDialogButtonClicked(word, translation)} />
    </div>
}