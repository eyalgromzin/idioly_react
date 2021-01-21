import { useSelector } from 'react-redux'
import { MAX_NUM_OF_CORRECT_ANSWERS } from 'common'
import {shuffleArray} from 'common'
import { add1ToWordCorrectAnswers, NUM } from 'actions/practiceActions'
import { deleteUserWord } from 'actions/userWordsActions'

const missingLetter = function(props){
    return <input class="oneLetterInput" type="text" name="usrname" maxlength="1" />    
}

const regularLetter = function(props){
    return props.letter
}

export default function(props){
    let word = props.questionWord.word
    let translation = props.questionWord.translation

    let missingLettersCount = 3
    if(word.length <= 4)missingLettersCount = 2
    
    let missingLettersIndexes = []
    let missingLetterIndex = Math.floor(Math.random() * word.length);
    while(word[missingLetterIndex == " " || missingLettersIndexes.indexOf(missingLetterIndex) != -1]){
        missingLetterIndex = Math.floor(Math.random() * word.length);
    }

    return <div>
        <div className="questionExplanation">fill in the missing letters</div>
        <div id="missingLettersContainer">
            
        </div>
        <div>Translation:</div>
        <div id="missingLettersTranslation">{props.questionWord.translation}</div>
    </div>
}