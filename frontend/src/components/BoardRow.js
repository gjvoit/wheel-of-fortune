import React, { Component } from 'react';
import BoardBlock from './BoardBlock';

export default class BoardRow extends Component {

  constructor(props) {
    super(props);
	  this.state = {message: ""};
  }

  render() {
    return (
      <div className="board-row">
        {this.renderRows()}
      </div>
    );
  }

  renderRows() {
    // console.log('letters:', this.props.letters);
    // console.log('blocks:', this.props.blockStates);
    var blocks = [];
    if (this.props.boundingRow) {
      blocks.push(<BoardBlock className="board-block board-block-placeholder" />);
    }
    blocks.push(<BoardBlock className="board-block" />);
    for (var i=0; i < this.props.size; i++) {
      switch(this.props.blockStates[this.props.row][i]) {
        case undefined:
          blocks.push(<BoardBlock className="board-block" />);
          break;
        case "board-block-pending-letter":
          blocks.push(<BoardBlock position={[this.props.row,i]} className="board-block board-block-pending-letter" />);
          break;
        case "board-block-active-letter":
          blocks.push(<BoardBlock position={[this.props.row,i]} letter={this.props.letters[this.props.row][i]} className="board-block board-block-active-letter" />);
          break;
        case "board-block-active-punctuation":
          blocks.push(<BoardBlock position={[this.props.row,i]} letter={this.props.letters[this.props.row][i]} className="board-block board-block-active-letter" />);
          break;
        default:
          blocks.push(<BoardBlock position={[this.props.row,i]} letter={this.props.letters[this.props.row][i]} className="board-block board-block-unguessed-letter" />);
          break;
      }
    }
    blocks.push(<BoardBlock className="board-block" />);
    if (this.props.boundingRow) {
      blocks.push(<BoardBlock className="board-block board-block-placeholder" />);
    }
    return blocks;
  }
}
