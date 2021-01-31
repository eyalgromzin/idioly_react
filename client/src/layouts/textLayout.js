import { useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import WordDialog from 'components/wordDialog'
import TranslatableWord from 'components/translatableWord'


export default function(props){
    const location = useLocation();
    const [textWords, setTextWords] = useState([])

    
    
    // const wordDialogRef = useRef();
    const wordDialogRef = React.createRef();

    useEffect(() => {                
        setTextWords(location.state.readingText.text.split(/[\s]/))
    }, [])

    return <div id="textContent">        
        {
            textWords.map( word => <TranslatableWord word={word} /> )
        }
    </div>
}