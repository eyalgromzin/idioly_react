import { useSelector } from 'react-redux'
import { MAX_NUM_OF_CORRECT_ANSWERS } from 'common'
import {shuffleArray} from 'common'
import { add1ToWordCorrectAnswers, NUM } from 'actions/practiceActions'
export default function(props){
    //4 translations , 1 word

    const userWords = useSelector(state => {
        return state.commonReducer.userWords
    })

    if(userWords.length == 0)return ""

    const asnwerClicked = function(answer){
        if(answer == word.translation){
            add1ToWordCorrectAnswers(word._id, "multipleTranslationsCorrectAnswers", () => {
                props.loadNextQuestion()
            }, () => {
                alert('failed to update word, click again')
            })
        }
    }

    var word = userWords[Math.floor(Math.random() * userWords.length)];

    if(word.multipleTranslationsCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS){
        console.log("question correct answers exceeded max, loading next question")
        props.loadNextQuestion()        
    }

    var translations = [word.translation]    
    for (let i =0; i< 3; i++){
        let translation = userWords[Math.floor(Math.random() * userWords.length)].translation;
        while(translations.indexOf(translation) != -1 || translation == word.translation){
            translation = userWords[Math.floor(Math.random() * userWords.length)].translation;
        }

        translations.push(translation)
    }

    translations = shuffleArray(translations)

    return <div id="multipleTranslationsQuestionContainer">        
        <div className="questionExplanation">Select the correct answer</div>
        <div id="multipleTranslationsWord">{word.word}</div>
        <div className="multipleTranslationsAnswerContainer">
            {
                translations.map(translation => <div className="multipleTranslationsAnswer" onClick={() => asnwerClicked(translation)} key={translation}>{translation}</div>)
            }
        </div>
    </div>
}