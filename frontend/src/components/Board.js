import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLetters, updateStates } from '../actions';
import BoardRow from './BoardRow';


// Info I need to know about each block...
// A Board is a list of BoardRows.
// A BoardRow is a list of BoardBlocks
// A BoardBlock has a value and a state.

// Reducers
// {
//   blockLetters: [],
//   blockStates: []
// }

class Board extends Component {
  constructor(props) {
    super(props);
	  this.state = {
      phrase: "Hello Amazing World!",
      guess: ''
    };
    this.allocateLetters = this.allocateLetters.bind(this);
    this.updatePhrase = this.updatePhrase.bind(this);
    this.clearPuzzle = this.clearPuzzle.bind(this);
    this.updateGuess = this.updateGuess.bind(this);
    this.makeGuess = this.makeGuess.bind(this);
    this.revealPuzzle = this.revealPuzzle.bind(this);
  }

  render() {
    var { blockLetters, blockStates } = this.props;
    // {console.log('this.props', this.props)};
    // {console.log('blockLetters: ', blockLetters)}
    // {console.log('blockStates: ', blockStates)}
    return (
      <div className="board">
        <BoardRow size={blockLetters[0].length} letters={blockLetters}
          row={0} blockStates={blockStates} boundingRow={true} />
        <BoardRow size={blockLetters[1].length} letters={blockLetters}
          row={1} blockStates={blockStates} />
        <BoardRow size={blockLetters[2].length} letters={blockLetters}
          row={2} blockStates={blockStates} />
        <BoardRow size={blockLetters[3].length} letters={blockLetters}
          row={3} blockStates={blockStates} boundingRow={true} />
        <input type="password" value={this.state.phrase} onChange={this.updatePhrase} />
        <button onClick={this.allocateLetters}> Next Puzzle </button> <br/>
        <button onClick={this.clearPuzzle}> Clear Current Puzzle </button> <br/>
        <input value={this.state.guess} onChange={this.updateGuess} />
        <button onClick={this.makeGuess}> Make Guess </button>
        <button onClick={this.revealPuzzle}> Reveal Puzzle </button>
      </div>
    );
  }

  // Updates the board to show blue blocks if any matching letters are found.
  makeGuess() {
    var indices = this.findGuessMatchesInPhrase(this.props.blockLetters, this.state.guess);
    this.props.updateStates(indices);
  }

  //
  findGuessMatchesInPhrase(arr, val) {
    var newBlockStates = this.props.blockStates.slice();
    val = val.toLowerCase();
    for (var i = 0; i < newBlockStates.length; i++) {
      for (var j = 0; j < newBlockStates[i].length; j++) {
        if (this.props.blockLetters[i][j] !== undefined) {
          newBlockStates[i][j] = this.props.blockLetters[i][j].toLowerCase() === val ? "board-block-pending-letter" : this.props.blockStates[i][j];
        }
      }
    }
    return newBlockStates;
  }

  // Simple event handler for a managed form input.
  updateGuess(event) {
    this.setState({ guess: event.target.value })
  }

  // For resetting the puzzle back to INITIAL_STATE.
  clearPuzzle() {
    this.props.updateLetters([new Array(14), new Array(16), new Array(16), new Array(14)]);
    this.props.updateStates([new Array(14), new Array(16), new Array(16), new Array(14)]);
    this.setState({
      phrase: '',
      guess: ''
    })
  }

  revealPuzzle() {
    var newStates = this.props.blockStates.slice();
    for (var i =0; i < newStates.length; i++) {
      for (var j=0; j < newStates[i].length; j++) {
        if (this.props.blockStates[i][j] !== undefined) {
          if (this.props.blockStates[i][j].includes("board-block-unguessed-letter") || this.props.blockStates[i][j].includes("board-block-pending-letter")) newStates[i][j] = "board-block-active-letter";
        }
      }
    }
    this.props.updateStates(newStates);
  }

  // Simple event handler for a managed form input.
  updatePhrase(event) {
    this.setState({ phrase: event.target.value });
  }

  // This will move the letters from this.state.phrase into a grid of letters,
  // representing itself on the board as the new puzzle.
  allocateLetters() {
    var splitPhrase = this.state.phrase.split(' ');
    var boardRows = [];
    var boardColumnIter = 0;
    var boardRowIter = 0;
    const { blockLetters, updateLetters, updateStates } = this.props;
    var tempLetters = [new Array(14), new Array(16), new Array(16), new Array(14)];
    var tempStates = [new Array(14), new Array(16), new Array(16), new Array(14)];
    for (var i = 0; i < splitPhrase.length; i++) {
      if (splitPhrase[i].length <= (blockLetters[boardRowIter].length - boardColumnIter)) {
        for (var j=0; j < splitPhrase[i].length; j++) {
          tempLetters[boardRowIter][j+boardColumnIter]=splitPhrase[i][j];
          if (splitPhrase[i][j] === '!' || splitPhrase[i][j] === '-' ||
          splitPhrase[i][j] === ',' || splitPhrase[i][j] === '\'') {
            tempStates[boardRowIter][j+boardColumnIter]="board-block-active-punctuation";
          } else {
            tempStates[boardRowIter][j+boardColumnIter]="board-block-unguessed-letter";
          }

        }
        boardColumnIter += splitPhrase[i].length+1;
      }
      else {
        boardColumnIter = 0;
        boardRowIter++;
        i--;
      }
    }
    updateLetters(tempLetters);
    updateStates(tempStates);
  }
}

function mapStateToProps(state) {
  return {
		blockLetters: state.board.blockLetters,
		blockStates: state.board.blockStates
	};
}

export default connect(mapStateToProps, { updateLetters, updateStates })(Board);
