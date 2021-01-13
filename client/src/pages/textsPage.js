export default textsPage = function(props){
    return <div id="textsPage">
        <div id="textsFilterBar">
            <select name="language" id="textsLanguageDropDOwn">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="Portuguese">Portuguese</option>            
            </select>
            <select name="level" id="textsLevelDropDOwn">
                <option value="superEasy">Super Easy</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>            
            </select>
        </div>
    </div>
}