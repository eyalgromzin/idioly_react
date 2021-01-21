import { useSelector } from 'react-redux'
import { MAX_NUM_OF_CORRECT_ANSWERS } from 'common'
import {shuffleArray} from 'common'
import { add1ToWordCorrectAnswers, NUM } from 'actions/practiceActions'
import { deleteUserWord } from 'actions/userWordsActions'
export default function(props){
    //4 translations , 1 word
    const userWords = useSelector(state => state.commonReducer.userWords)

    const asnwerClicked = function(answer){
        if(answer == props.questionWord.word){
            add1ToWordCorrectAnswers(props.questionWord._id, "multipleWordsCorrectAnswers", () => {
                alert("correct answer")
                props.loadNextQuestion()
            }, () => {
                alert('failed to update word, click again')
            })
        }else{
            alert('wrong answer!')
        }
    }

    if(props.questionWord.multipleWordsCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS){
        console.log("question correct answers exceeded max, loading next question")
        
        if(props.questionWord.multipleWordsCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS &&
            props.questionWord.multipleTranslationsCorrectAnswers >= MAX_NUM_OF_CORRECT_ANSWERS){
                deleteUserWord(props.questionWord._id, () => {
                    props.loadNextQuestion()  
                    return ""
                }, () => { 
                    props.loadNextQuestion()  
                    return ""
                 })
        }else{
            props.loadNextQuestion()  
            return ""
        }        
    }

    var answerWords = [props.questionWord.word]  

    for (let i =0; i< 3; i++){
        let word = userWords[Math.floor(Math.random() * userWords.length)].word;
        while(answerWords.indexOf(word) != -1){
            word = userWords[Math.floor(Math.random() * userWords.length)].word;
        }

        answerWords.push(word)
    }

    answerWords = shuffleArray(answerWords)

    return <div id="multipleTranslationsQuestionContainer">        
        <div className="questionExplanation">Select the correct answer</div>
        <div id="multipleTranslationsWord">{props.questionWord.translation}</div>
        <div className="multipleTranslationsAnswerContainer">
            {
                answerWords.map(word => <div className="multipleTranslationsAnswer" onClick={() => asnwerClicked(word)} key={word}>{word}</div>)
            }
        </div>
    </div>
}