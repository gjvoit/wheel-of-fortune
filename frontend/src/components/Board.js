import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateLetters, updateStates } from '../actions';
import BoardRow from './BoardRow';


// Info I need to know about each block...
// A Board is a list of BoardRows.
// A BoardRow is a list of BoardBlocks
// A BoardBlock has a value and a state.
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
// Reducers
  //

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
      </div>
    );
  }

  findGuessMatchesInPhrase(arr, val) {
    var indices = this.props.blockLetters;
    // console.log('indices before:', indices);
    for (var i = 0; i < indices.length; i++) {
      for (var j = 0; j < indices[i].length; j++)
      indices[i][j] = indices[i][j] === undefined ? undefined : indices[i][j].toLowerCase();
    }
    // console.log('indices after:',indices);

    return indices;
  }

  makeGuess() {
    // console.log('makeGuess(): ', this.props.blockLetters);
    var indices = this.findGuessMatchesInPhrase(this.props.blockLetters, this.state.guess)
    // console.log(indices);
  }

  // makeGuess() {
  //   var indices = this.findGuessMatchesInPhrase(this.state.letters, this.state.guess);
  //   var tempLetters = this.state.pendingLetters;
  //   console.log("tempLetters: " + tempLetters);
  //   for (var a = 0; a < tempLetters.length; a++) {
  //     for (var b = 0; b < tempLetters[a].length; b++)
  //     tempLetters[a][b] = false;
  //   }
  //   console.log(this.state.letters);
  //   for (var i = 0; i < indices.length; i++) {
  //     for (var j = 0; j < indices[i].length; j++) {
  //       if (indices[i][j]) {
  //         console.log("true for index:["+i+"]["+j+"]:", indices[i][j]);
  //         tempLetters[i][j] = indices[i][j];
  //       } else {
  //         console.log("false for index:["+i+"]["+j+"]:", indices[i][j]);
  //       }
  //     }
  //   }
  // }

  updateGuess(event) {
    this.setState({ guess: event.target.value })
  }

  clearPuzzle() {
    this.props.updateLetters([new Array(14), new Array(16), new Array(16), new Array(14)]);
    this.props.updateStates([new Array(14), new Array(16), new Array(16), new Array(14)]);
    this.setState({
      phrase: '',
      guess: ''
    })
  }

  updatePhrase(event) {
    this.setState({ phrase: event.target.value });
  }

  allocateLetters() {
    var splitPhrase = this.state.phrase.split(' ');
    console.log('splitPhrase', splitPhrase);
    var boardRows = [];
    var boardColumnIter = 0;
    var boardRowIter = 0;
    const { blockLetters, updateLetters, updateStates } = this.props;
    var tempLetters = [new Array(14), new Array(16), new Array(16), new Array(14)];
    var tempStates = [new Array(14), new Array(16), new Array(16), new Array(14)];
    // console.log(splitPhrase);
    for (var i = 0; i < splitPhrase.length; i++) {
      // console.log("<=: ", this.state.board[boardRowIter] - boardColumnIter);
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
        // console.log(tempLetters);
        // console.log('boardColumnIter:', boardColumnIter);
        // console.log('boardRowIter:', boardRowIter);
      }
      else {
        boardColumnIter = 0;
        boardRowIter++;
        i--;
      }
    }
    console.log('tempLetters: ', tempLetters);
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

// A BoardBlock can have 4 states, placeholder, inactive, letter-inactive, and letter-active
// Split "phrase" based on spaces so that we have an array of words
// While the current row can fit the next item in splitPhrase, modify "letters"
