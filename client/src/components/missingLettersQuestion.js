import { useSelector } from 'react-redux'
import { add1ToWordCorrectAnswers, NUM } from 'actions/practiceActions'
import { deleteUserWord } from 'actions/userWordsActions'
import React, { useState } from 'react';

const MissingLetter = function(props){
    let numOfTries = 0

    const [isDisabled, setIsDisabled] = useState(false)

    const onLetterTyped = (e) => {
        if(e.target.value == props.letter){
            setIsDisabled(true)
            props.onCorrectLetter()
        }else{
            numOfTries += 1
            if (numOfTries >= 2){
                props.onFail()
            }
        }
    }

    return <input class="oneLetterInput" disabled={isDisabled? "disabled" : ""} onChange={onLetterTyped} type="text" name="usrname" maxlength="1" />    
}

const RegularLetter = function(props){
    return <span>{props.letter}</span>
}

export default function(props){
    let word = props.questionWord.word
    let translation = props.questionWord.translation

    let missingLettersCount = 3
    if(word.length <= 4)missingLettersCount = 2
    
    let missingLettersIndexes = []
    for(let i=0 ;i< missingLettersCount; i++){
        let missingLetterIndex = Math.floor(Math.random() * word.length);
        while(word[missingLetterIndex == " " || missingLettersIndexes.indexOf(missingLetterIndex) != -1]){
            missingLetterIndex = Math.floor(Math.random() * word.length);
        }
        missingLettersIndexes.push(missingLetterIndex)
    }

    let correctLetterInserted = (index) => {

    }

    return <div>
        <div className="questionExplanation">fill in the missing letters</div>
        <div id="missingLettersContainer">
            { 
                word.split("").map((letter, index) => missingLettersIndexes.indexOf(index) != -1? 
                    <MissingLetter letter={letter} onCorrectLetter={() => correctLetterInserted(index)} /> : 
                    <RegularLetter letter={letter} /> )
            }
        </div>
        <div>Translation:</div>
        <div id="missingLettersTranslation">{translation}</div>
    </div>
}