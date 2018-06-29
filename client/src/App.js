import React, { Component } from 'react';
import { PhotoProvider } from './context/photo';
import { PaginationDataProvider } from './context/pagination-data';
import Navbar from './components/nav/navbar';
import Navtab from './components/nav/navtab';
import Footer from './components/footer';
import Content from './components/content';
import './styles/App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <PhotoProvider>
          <PaginationDataProvider>
            <Content>
              <Navbar />
              <Navtab />
            </Content>
            <Footer />
          </PaginationDataProvider>
        </PhotoProvider>
      </div>
    );
  }
}

export default App;
