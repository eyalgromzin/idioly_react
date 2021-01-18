import React, { useState } from 'react'
import { translateWord } from 'translateActions'
import './components.css'
import {getTodaysDateString, MAX_TRANSLATIONS_TILL_LOGIN, isLoggedIn} from 'common'
import {trimLeft, trimRight} from 'common'
import {showLogInScreen} from 'actions/commonActions'
import { useSelector } from 'react-redux'

export default function TranslatableWord (props){
    const TRANSLATED_WORDS_COUNT_TODAY_KEY = "TRANSLATED_WORDS_COUNT_TODAY_KEY"

    const [isTranslated, setIsTranslated] = useState(false)
    const [translation, setTranslation] = useState("")

    const isLoggedIn = useSelector(state => {
        return state.commonReducer.loggedInWith != "NONE"
    })

    var translateClickedWord = (word) => {
        var numOfTranslatedWordsToday = getTodaysNumOfTranslatedWordFromLocalStorage()
        if(isLoggedIn || numOfTranslatedWordsToday < MAX_TRANSLATIONS_TILL_LOGIN){
            translateWord(props.word, "es", "en", (translation) => {
                if(!isTranslated){  
                    setIsTranslated(true)
                    setTranslation(translation)
                    increaseNumOfTranslatedWordsToday()
                }
            }, (error) => {
                alert(error)
            })
        }else{
            showLogInScreen()
        }
    }

    var increaseNumOfTranslatedWordsToday = () => {
        let dateToday = getTodaysDateString()

        let translatedWordsObjectJson = localStorage.getItem(TRANSLATED_WORDS_COUNT_TODAY_KEY)
        if(translatedWordsObjectJson != null){
            let translatedWordsTodayObject = JSON.parse(translatedWordsObjectJson)
            if(translatedWordsTodayObject.date == dateToday){
                translatedWordsTodayObject.numOfTranslatedWords += 1
                localStorage.setItem(TRANSLATED_WORDS_COUNT_TODAY_KEY, JSON.stringify(translatedWordsTodayObject));
            }else{
                let translatedWordsTodayObject = {date: dateToday, numOfTranslatedWords: 1}
                localStorage.setItem(TRANSLATED_WORDS_COUNT_TODAY_KEY, JSON.stringify(translatedWordsTodayObject));
            }
        }else{
            let translatedWordsTodayObject = {date: dateToday, numOfTranslatedWords: 1}
            localStorage.setItem(TRANSLATED_WORDS_COUNT_TODAY_KEY, JSON.stringify(translatedWordsTodayObject));
        }
    }

    var getTodaysNumOfTranslatedWordFromLocalStorage = () => {
        let todaysTranslatedWordsCountJson = localStorage.getItem(TRANSLATED_WORDS_COUNT_TODAY_KEY )
        
        if(todaysTranslatedWordsCountJson == null)return 0
        else{
            let translatedCountObject = JSON.parse(todaysTranslatedWordsCountJson)
            let dateToday = getTodaysDateString()
            if(translatedCountObject.date == dateToday)return translatedCountObject.numOfTranslatedWords
            else return 0
        }
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