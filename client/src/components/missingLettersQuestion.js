import 'components/components.css'
import React, { useState } from 'react';
import {trimWord } from 'common'
import {useRef, useEffect, useImperativeHandle, forwardRef  } from 'react'

const MissingLetter = forwardRef((props, ref) =>{ 
    const [isDisabled, setIsDisabled] = useState(false)
    const [letter, setLetter] = useState("")

    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        imperativeRequestFocus(){
            requestFocus()
        }
      }));

    var requestFocus = () => {
        inputRef.current.focus();
    }

    useEffect(() => {
        if(props.isSetFocus){
            inputRef.current.focus();
        }
    }, [])

    const onLetterTyped = (e) => {
        setLetter(e.target.value)

        if(e.target.value.toLowerCase() == props.letter.toLowerCase()){
            setIsDisabled(true)
            props.onCorrectLetter()
        }else{
            props.onWrongLetter()
            //wait 2 seconds and remove letter            
            setTimeout(() => {
                setLetter("")
            }, 1000);
        }
    }    

    return <input class="oneLetterInput"  value={letter} ref={inputRef}
        disabled={isDisabled? "disabled" : ""} onChange={onLetterTyped} type="text" name="usrname" maxLength="1" />    
})

const RegularLetter = function(props){
    return <span>{props.letter}</span>
}

export default function(props){
    const lettersRefs = []

    let word = props.questionWord.word
    let translation = props.questionWord.translation
    let correctLettersCount = 0
    let numOfTries = 0

    let missingLettersCount = 3
    if(word.length <= 4)missingLettersCount = 1
    
    let missingLettersIndexes = []
    for(let i=0 ;i< missingLettersCount; i++){
        let missingLetterIndex = Math.floor(Math.random() * word.length);
        while(word[missingLetterIndex] == " " || missingLettersIndexes.indexOf(missingLetterIndex) != -1){
            missingLetterIndex = Math.floor(Math.random() * word.length);
        }
        missingLettersIndexes.push(missingLetterIndex)
    }

    missingLettersIndexes.sort(function(a, b) {
        return a - b;
      });

    let focusOnNextLetter = (index) => {
        for(let i=0; i < missingLettersIndexes.length; i++){
            let missingLetterIndex = missingLettersIndexes[i]
            if(missingLetterIndex > index ){
                lettersRefs[i].imperativeRequestFocus()                
                break;
            }
        }
    }

    let onCorrectLetter = (index) => {
        correctLettersCount += 1
        
        focusOnNextLetter(index)

        if(correctLettersCount == missingLettersCount){
            props.onSuccess()
        }
    }

    let onWrongLetter = (index) => {
        numOfTries += 1
        if (numOfTries >= 2){
            props.onFail()
        }        
    }

    let letterRefIndex = 0

    return <div>
        <div className="questionExplanation">fill in the missing letters</div>
        <div id="missingLettersContainer">
            { 
                word.split("").map((letter, index) => missingLettersIndexes.indexOf(index) != -1? 
                    <MissingLetter letter={letter} 
                        key={++letterRefIndex + letter+word+index + props.questionNumber}
                        onCorrectLetter={() => onCorrectLetter(index)}  
                        onWrongLetter={() => onWrongLetter(index)}
                        isSetFocus={index == missingLettersIndexes[0]? true: false}
                        ref={el => {
                            lettersRefs.push(el) 
                        } }
                        /> : 
                    <RegularLetter letter={letter} /> )
            }
        </div>
        <div>Translation:</div>
        <div id="missingLettersTranslation">{translation}</div>
    </div>
}