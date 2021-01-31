import React, { useState, useCallback } from 'react'
import { translateWord } from 'translateActions'
import './components.css'
import {getTodaysDateString, MAX_TRANSLATIONS_TILL_LOGIN, isLoggedIn} from 'common'
import {showLogInScreen} from 'actions/commonActions'
import { useSelector } from 'react-redux'
import {addUserWordToDB, addWordToUserWords} from 'actions/userWordsActions'
import {trimWord} from 'common'

let x  = 5

export default function TranslatableWord (props){
    var trimmedWord = props.word
    trimmedWord = trimWord(trimmedWord)

    const TRANSLATED_WORDS_COUNT_TODAY_KEY = "TRANSLATED_WORDS_COUNT_TODAY_KEY"

    const [isTranslated, setIsTranslated] = useState(false)
    const [translation, setTranslation] = useState(" ")
    const [wordImageSrc, setWordImageSrc] = useState(require('images/plus.png').default)

    const isLoggedIn = useSelector(state => { 
        x  = 3

        return state.commonReducer.loggedInWith != "NONE"
    })

    const userID = useSelector(state => state.commonReducer.loggedInUserID)
    const fromLanguage = useSelector(state => state.commonReducer.fromLanguage)
    const toLanguage = useSelector(state => state.commonReducer.toLanguage)
    const userWords = useSelector(state => state.commonReducer.userWords)

    var translateClickedWord = () => {
        var numOfTranslatedWordsToday = getTodaysNumOfTranslatedWordFromLocalStorage()
        if(isLoggedIn || numOfTranslatedWordsToday < MAX_TRANSLATIONS_TILL_LOGIN){
            if(isLoggedIn){
                const translatedWord = userWords.find(userWord => userWord.word == trimmedWord)
                if(typeof translatedWord !== 'undefined'){
                    setIsTranslated(true)
                    setTranslation(translatedWord.translation)
                    increaseNumOfTranslatedWordsToday()
                }else{
                    translateWord(trimmedWord, fromLanguage, toLanguage, (translation) => {
                        if(!isTranslated){  
                            setIsTranslated(true)
                            setTranslation(translation)
                            increaseNumOfTranslatedWordsToday()
                        }
                    }, (error) => {
                        alert(error)
                    })
                }
            }else{
                translateWord(trimmedWord, fromLanguage, toLanguage, (translation) => {
                    if(!isTranslated){  
                        setIsTranslated(true)
                        setTranslation(translation)
                        increaseNumOfTranslatedWordsToday()
                    }
                }, (error) => {
                    alert(error)
                })
            }
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

    var addWordToDB = (word, translation) => {        
        if(isLoggedIn){
            const userWord = userWords.find(userWord => userWord.word == trimmedWord)
            if(typeof userWord === 'undefined'){
                addUserWordToDB(userID, fromLanguage, toLanguage, word, translation, '', res => {
                    console.log('got result from add user word: ' + res)
                    setWordImageSrc(require('images/check_mark_black.png').default)
                    addWordToUserWords(res)
                }, error => {
                    console.log('failed to add user word to db: ' + error)
                })
            }else{
                setWordImageSrc(require('images/check_mark_black.png').default)
            }
        }else{
            showLogInScreen()
        }
    }

    var createdWordMethods = 0

    return <div className="textWord" onClick={() => { translateClickedWord() }}>
        <div className="wordTranslation" 
            onClick={() => addWordToDB(trimmedWord, translation) }>
            <span className="wordTranslation2">{translation}</span>
            {isTranslated? <img src={wordImageSrc} className="wordPlusImage" /> : ""}            
        </div>
        <div className="wordWord"><span>{props.word}&nbsp;</span></div>
    </div>
}