import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import React, { Component } from 'react';

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {apiResponse: ""}
  }

  callAPI = () => {
    fetch("http://localhost:9000/testapi")
    .then(res => res.text())
    .then(res => this.setState({apiResponse: res}))
  }

  componentDidMount(){
    this.callAPI()
  }

  render(){
    return (
      <div className="App">
        {this.state.apiResponse}
      </div>
    );
  }
}

export default App;
