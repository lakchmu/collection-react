import React, { Component } from 'react';
import Navbar from './components/nav/navbar';
import Navtab from './components/nav/navtab';
import Content from './components/content';
import Home from './components/home';
import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Content>
          <Navtab />
          <Home />
        </Content>
      </div>
    );
  }
}

export default App;
