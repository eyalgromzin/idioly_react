import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import React, { Component } from 'react';
// import MainLayout from './pages/mainLayout';
import MainLayout from 'layouts/mainLayout';
import store from 'store'
import { Provider } from 'react-redux';

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
    // this.callAPI()
  }

  render(){
    return (
      <Provider store={store}>
        <MainLayout />        
      </Provider>
    );
  }
}

export default App;
