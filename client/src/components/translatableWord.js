import React, { useState } from 'react'
import { translateWord } from 'translateActions'
import './components.css'

export default function TranslatableWord (props){

    const [isTranslated, setIsTranslated] = useState(false)
    const [translation, setTranslation] = useState("")

    var translateClickedWord = (word) => {
        translateWord(props.word, "es", "en", (translation) => {
            if(!isTranslated){
                setIsTranslated(true)
                setTranslation(translation)
            }
        }, (error) => {
            alert(error)
        })
    }

    var addWordToMyWords = (word) => {
        
    }

    var plusImageName = require('images/plus.png')

    return <div class="textWord" onClick={() => { translateClickedWord(props.word) }}>
        <div class="wordTranslation">
            {translation} 
            {isTranslated? <img src={plusImageName.default} className="wordPlusImage" onClick={() => addWordToMyWords(props.word)} /> : ""}            
        </div>
        <div class="wordWord"><span>{props.word}&nbsp;</span></div>
    </div>
}