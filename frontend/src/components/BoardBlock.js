import React, { Component } from 'react';

// A BoardBlock's state can be one of five things
  // board-block-revealed-letter: Its value is not undefined (i.e. it has a letter) and is displaying the letter.
    // Completely White Block, normal border, letter.
  // board-block-unrevealed-letter: Its value is not undefined (i.e. it has a letter) and is NOT displaying the letter (can turn into pending-reveal-letter).
    // Completely White Block, normal border, no letter.
  // board-block-pending-reveal-letter: Its value is not undefined (i.e. it has a letter) and is waiting to be revealed by the user (turns into board-block-revealed-letter).
    // Completely Blue Block, normal border, no letter.
  // board-block-white-placeholder: Its value is undefined, it is only present on the first and last rows of the Board and only as the first and last BoardBlock of these BoardRows.
    // Completely White Block, no border.
  // board-block-green-placeholder
    // Completely Green Block, normal border, value is always undefined.

export default class BoardBlock extends Component {
  constructor(props) {
    super(props);
    this.renderLetter = this.renderLetter.bind(this);
  }

  render() {
    return (
      <div className={this.props.className}>{this.renderLetter()}</div>
    );
  }
  renderLetter() {
    const { className } = this.props;
    if (className.includes("board-block-active-letter") || className.includes("board-block-active-punctuation")) {
      return this.props.letter;
    }
    return "";
  }
}

// TODO
// makeGuess
// onClick for each button
