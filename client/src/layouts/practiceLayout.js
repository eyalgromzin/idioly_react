import { showLogInScreen } from 'actions/commonActions'
import { useSelector } from 'react-redux'
import MultipleTranslationsQuestion from 'components/multipleTranslationsQuestion'
import React, { useState, useEffect } from 'react';
import { MAX_NUM_OF_CORRECT_ANSWERS, MIN_WORDS_FOR_PRACTICE } from 'common';
import MissingLettersQuestion from 'components/missingLettersQuestion';
import {trimWord} from 'common'
import { add1ToWordCorrectAnswers } from 'actions/practiceActions'
import MultipleWordsQuestion from 'components/multipleWordsQuestion';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function(props){
    let questionWord = {}
    const userWords = useSelector(state => {
        return state.commonReducer.userWords
    })
    const isLoggedIn = useSelector(state => { 
        return state.commonReducer.loggedInWith != "NONE"
    })
    const [toggle, setToggle] = useState(false)
    const [isShowToast, setIsShowToast] = useState(false);

    let questionNumber = 0
    let questionType = 0

    var loadNextQuestion = function(){        
        setToggle(!toggle)
    }

    var onCorrectAnswer = () => {
        let fieldName = ""
        if(questionType == 0){
            fieldName = "multipleTranslationsCorrectAnswers"        
        }else if(questionType == 1){
            fieldName = "multipleWordsCorrectWords"         
        }else if(questionType == 2){
            fieldName = "missingLettersCorrectAnswers"       
        }
        add1ToWordCorrectAnswers(questionWord._id, fieldName, () => {
            toast.success("Success!!");
            loadNextQuestion()
        }, () => {
            alert('failed to update word, loading next question')
            loadNextQuestion()
        })
    }

    var onFailed = function(word, translation){
        alert(word + " = " + translation + ", failed , loading next question")
        loadNextQuestion()
    }

    if(isLoggedIn){  
        if(userWords.length >= MIN_WORDS_FOR_PRACTICE){
            
            questionWord = userWords[Math.floor(Math.random() * userWords.length)]
            questionType = Math.floor(Math.random() * 3);

            while((questionType == 0 && questionWord.multipleTranslationsCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS) ||
                (questionType == 1 && questionWord.multipleWordsCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS) ||
                (questionType == 2 && questionWord.missingLettersCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS)){
                questionType = Math.floor(Math.random() * 3);
            }

            questionWord.word = trimWord(questionWord.word) //doesnt work

            var question = <div></div>

            if(questionType == 0){
                question = ( <div>
                    <MultipleTranslationsQuestion loadNextQuestion={loadNextQuestion} questionWord={questionWord} 
                    onSuccess={() => onCorrectAnswer()} onFail={() => onFailed(questionWord.word, questionWord.translation)}
                    />
                </div>)
            }else if(questionType == 1){
                question = (<div>
                        <MultipleWordsQuestion questionNumber={questionNumber} loadNextQuestion={loadNextQuestion} questionWord={questionWord} 
                        onSuccess={() => onCorrectAnswer()} onFail={() => onFailed(questionWord.word, questionWord.translation)}
                        />
                    </div>)
            }else if(questionType == 2){
                question = (<div>
                    <MissingLettersQuestion questionNumber={questionNumber} loadNextQuestion={loadNextQuestion} questionWord={questionWord} 
                    onSuccess={() => onCorrectAnswer()} onFail={() => onFailed(questionWord.word, questionWord.translation)}
                    />
                </div>)
            }
            return <div>
                <ToastContainer position="top-center"  autoClose={1000} />

                {question}                
            </div>
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