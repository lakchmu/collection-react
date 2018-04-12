import React, { Component } from 'react';
import Navbar from './components/nav/navbar';
import Home from './components/home';
import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
