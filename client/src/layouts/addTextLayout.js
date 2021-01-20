import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './layouts.css'
import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import {addTextToDB, getHtmlFromUrl} from 'actions/textsActions'
import { useSelector } from 'react-redux'
import { isTextExistsInText } from 'common'

export default function(props){
    const [level, setLevel] = useState("none")
    const [type, setType] = useState("none")
    const [language, setLanguage] = useState("Spanish")
    const [title, setTitle] = useState("")
    const [isTitleEmpty, setIsTitleEmpty] = useState(false)
    const [content, setContent] = useState("")
    const [isContentEmpty, setIsContentEmpty] = useState(false)
    const [author, setAuthor] = useState("")
    const [isAuthorEmpty, setIsAuthorEmpty] = useState(false)
    const [sourceUrl, setSourceUrl] = useState("")
    const [isSourceUrlEmpty, setIsSourceUrlEmpty] = useState(false)
    const [youtubeUrl, setYoutubeUrl] = useState("")
    
    const userID = useSelector(state => state.commonReducer.loggedInUserID)
    
    function clearAllFields(){
        setTitle("")
        setContent("")
        setAuthor("")
        setSourceUrl("")
        setYoutubeUrl("")
    }

    function validateFields(){
        if(userID != "" && title != "" && content != "" && author != "" && sourceUrl != "" && level != "" && type != ""){
            return true
        }else{
            let errorStr = "missing: "
            if(userID == "")errorStr += "userID, "
            if(title == "")errorStr += "title, "
            if(content == "")errorStr += "content, "
            if(author == "")errorStr += "author, "
            if(sourceUrl == "")errorStr += "sourceUrl, "
            if(level == "")errorStr += "level, "
            if(type == "")errorStr += "type"
            
            alert(errorStr)
            
            return false
        }
    }

    function onCreateButtonClick(e){
        if(validateFields()){
            let wordCount = content.split(/[\s,\n]+/).length
            getHtmlFromUrl(sourceUrl, function (response) {
                // console.log("response.json(): " + response.json());
                response.body.getReader().read().then(({ done, value }) => {
                    var htmlText = new TextDecoder("utf-8").decode(value)
                    
                    if(isTextExistsInText(content, htmlText)){
                        addTextToDB(language, title, author, level, type, sourceUrl, youtubeUrl, content, wordCount, userID, addedItem => {
                            alert("text added!")
                            clearAllFields()
                        }, error => {
                            alert("failed to add item: " + error)
                        })            
                    }
                })
            })    
        }    
    }

    

   
    return <div id="addTextPage">
        <div id="addTextCriterias">
            <div className="pageHeader">New Text</div>
            <FormControl id="addTextLanguageContainer">
                    <Select
                        labelId="addTextLevelLabel"
                        id="addTextLevel"
                        value={ language }
                        onChange={e => setLanguage(e.target.value)}
                        >
                        <MenuItem value={"Spanish"}>Spanish</MenuItem>
                        <MenuItem value={"English"}>English</MenuItem>
                        <MenuItem value={"French"}>French</MenuItem>
                        <MenuItem value={"Portuguese"}>Portuguese</MenuItem>
                        <MenuItem value={"German"}>German</MenuItem>
                        <MenuItem value={"Italian"}>Italian</MenuItem>
                        <MenuItem value={"Hebrew"}>Hebrew</MenuItem>
                    </Select>
                </FormControl>
            <TextField id="addTextTextName" 
                label="Text name" onChange={e => setTitle(e.target.value)} 
                error={isTitleEmpty}
                helperText={isTitleEmpty ? 'Empty!' : ' '}
                onBlur={e => setIsTitleEmpty(e.target.value == "")}
                value={title}
                />
            <TextField id="addTextAuthor" label="Author" value={author} onChange={e => setAuthor(e.target.value)} />
            <TextField id="addTextSourceUrl" label="Source Url" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} />
            <TextField id="addTextYoutubeUrl" label="Youtube Url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} />
            <div id="addTextLevelAndType">
                <FormControl id="addTextLevelContainer">
                    <Select
                        labelId="addTextLevelLabel"
                        id="addTextLevel"
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                        >
                        <MenuItem value={"none"}>Level</MenuItem>
                        <MenuItem value={"super_easy"}>Super Easy</MenuItem>
                        <MenuItem value={"easy"}>Easy</MenuItem>
                        <MenuItem value={"intermediate"}>Medium</MenuItem>
                        <MenuItem value={"advanced"}>Hard</MenuItem>
                    </Select>
                </FormControl>

                <FormControl id="addTextTypeContainer">
                    <Select
                        id="addTextType"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        >
                        <MenuItem value={"none"}>Type</MenuItem>
                        <MenuItem value={"story"}>Story</MenuItem>
                        <MenuItem value={"conversation"}>Conversation</MenuItem>
                        <MenuItem value={"article"}>Article</MenuItem>
                        <MenuItem value={"lyrics"}>Lyrics</MenuItem>
                    </Select>
                </FormControl>
            </div>            
            
            <FormControl id="addTextContentContainer">
                <TextField id="addTextContent" value={content} 
                    onChange={e => setContent(e.target.value)} rows={10} variant="outlined" 
                    multiline={true} label="Paste text here..." 
                    />
            </FormControl>   

            <FormControl id="addTextButtonContainer">
                <Button onClick={onCreateButtonClick}>Create</Button>         
            </FormControl>
        </div>
    </div>
}