// import logo from './logo.svg';
import './App.css';


import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <News pageSize={5} country="in" category="entertainment"></News>
        
      </div>
    )
  }
}



// export default App;
