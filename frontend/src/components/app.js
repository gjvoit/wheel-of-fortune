import React, { Component } from 'react';
import Board from './Board';
import Header from './Header';
import Category from './Category';

export default class App extends Component {
  render() {
    return (
      <div className="app">
      <Header />
      <Category className="category" category="Microservices" />
      <br/>
      <Board />
      </div>
    );
  }
}
