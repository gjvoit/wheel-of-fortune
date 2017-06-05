import React, { Component } from 'react';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hint: 'Microservices'
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
  }
  render() {
    return (
      <div className="category">
      <input className="category" value={this.state.hint} onChange={this.onCategoryChange}>
      </input>
      </div>
    );
  }
  onCategoryChange(event) {
    this.setState({ hint: event.target.value })
  }
}
