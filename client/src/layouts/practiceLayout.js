import { showLogInScreen } from 'actions/commonActions'
import { useSelector } from 'react-redux'
import MultipleTranslationsQuestion from 'components/multipleTranslationsQuestion'
import MultipleWordsQuestion from 'components/multipleWordsQuestion'
import React, { useState, useEffect } from 'react';
import { MAX_NUM_OF_CORRECT_ANSWERS, MIN_WORDS_FOR_PRACTICE } from 'common';
import MissingLettersQuestion from 'components/missingLettersQuestion';

export default function(props){
    const userWords = useSelector(state => state.commonReducer.userWords)
    const isLoggedIn = useSelector(state => { 
        return state.commonReducer.loggedInWith != "NONE"
    })
    const [toggle, setToggle] = useState(false)

    var loadNextQuestion = function(){
        setToggle(!toggle)
    }

    if(isLoggedIn){  
        if(userWords.length >= MIN_WORDS_FOR_PRACTICE)       {
            
            var questionWord = userWords[Math.floor(Math.random() * userWords.length)]
            let questionType = Math.floor(Math.random() * 3);
            
            while((questionType == 0 && questionWord.multipleTranslationsCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS) ||
                (questionType == 1 && questionWord.multipleWordsCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS) ||
                (questionType == 2 && questionWord.missingLettersCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS)){
                questionType = Math.floor(Math.random() * 3);
            }

            if(questionType == 0){
                return <MissingLettersQuestion loadNextQuestion={loadNextQuestion} questionWord={questionWord} />
            }else if(questionType == 1){
                return <MissingLettersQuestion loadNextQuestion={loadNextQuestion} questionWord={questionWord} />
            }else if(questionType == 2){
                return <MissingLettersQuestion loadNextQuestion={loadNextQuestion} questionWord={questionWord} />
            }
        }else{
            return <div>not enough words for practice, plz add more </div>
        }
    }else{
        return <div>
            <div>"to practice, plz login"</div>
            <div id="practiceLoginButton" onClick={() => showLogInScreen()}>Login</div>
        </div>
    }    
}