import React, { useState } from 'react'
import { translateWord } from 'translateActions'
import './components.css'
import {getTodaysDateString, MAX_TRANSLATIONS_TILL_LOGIN, isLoggedIn} from 'common'
import {trimLeft, trimRight} from 'common'
import {showLogInScreen} from 'actions/commonActions'
import { useSelector } from 'react-redux'
import {addUserWordToDB} from 'actions/userWordsActions'

export default function TranslatableWord (props){
    const TRANSLATED_WORDS_COUNT_TODAY_KEY = "TRANSLATED_WORDS_COUNT_TODAY_KEY"

    const [isTranslated, setIsTranslated] = useState(false)
    const [translation, setTranslation] = useState(" ")
    const [wordImageSrc, setWordImageSrc] = useState(require('images/plus.png').default)

    const isLoggedIn = useSelector(state => { 
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
                const translatedWord = userWords.find(word => word.word == props.word)
                if(typeof translatedWord !== 'undefined'){
                    setIsTranslated(true)
                    setTranslation(translatedWord.translation)
                    increaseNumOfTranslatedWordsToday()
                }else{
                    translateWord(props.word, fromLanguage, toLanguage, (translation) => {
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
                translateWord(props.word, fromLanguage, toLanguage, (translation) => {
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
            const translatedWord = userWords.find(word => word.word == props.word)
            if(typeof translatedWord === 'undefined'){
                addUserWordToDB(userID, fromLanguage, toLanguage, word, translation, '', res => {
                    console.log('got result from add user word: ' + res)
                    setWordImageSrc(require('images/check_mark_black.png').default)
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

    return <div class="textWord" onClick={() => { translateClickedWord() }}>
        <div class="wordTranslation" onClick={() => addWordToDB(props.word, translation)}>
            <span class="wordTranslation2">{translation} </span><span class="invisible">a</span>
            {isTranslated? <img src={wordImageSrc} className="wordPlusImage" onClick={() => addWordToDB(props.word)} /> : ""}            
        </div>
        <div class="wordWord"><span>{props.word}&nbsp;</span></div>
    </div>
}