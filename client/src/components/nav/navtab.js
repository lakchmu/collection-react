import React, { Component } from 'react';

class Navtab extends Component {
  render() {
    return (
      <nav className="navtab">
        <ul>
          <li><a href="./#">Home</a></li>
          <li><a href="./#">All Series</a></li>
          <li><a href="./#">Info</a></li>
        </ul>
      </nav>
    );
  }
}

export default Navtab;
