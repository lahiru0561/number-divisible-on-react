import React, { Component } from 'react';
import Divisible from './components/Divisible';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h1 style={{ width: 300, display: 'block', margin: 'auto' }}>
            Divisible Test
          </h1>
          <Route exact path="/" component={Divisible} />
        </div>
      </Router>
    );
  }
}

export default App;
