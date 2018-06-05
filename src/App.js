import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import data from './data/data';
import { createLeagueTable } from './utils/create-league-table';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data,
    }
  }

  componentDidMount() {
    createLeagueTable(this.state.data);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
