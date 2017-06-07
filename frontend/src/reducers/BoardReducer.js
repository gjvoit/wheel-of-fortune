import {
	UPDATE_STATES,
	UPDATE_LETTERS
} from '../actions/types';

const TAG = 'BoardReducer | ';

const INITIAL_STATE = { blockLetters: [new Array(14), new Array(16), new Array(16), new Array(14)],
 	blockStates: [new Array(14), new Array(16), new Array(16), new Array(14)]
}

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case UPDATE_STATES:
			// console.log('UPDATE_STATES | action.payload.blockStates:', action.payload.blockStates);
			// console.log('UPDATE_STATES | state:', state);
			return { ...state, blockStates: action.payload.blockStates };
		case UPDATE_LETTERS:
			// console.log('UPDATE_LETTERS | action.payload.blockLetters:', action.payload.blockLetters);
			// console.log('UPDATE_LETTERS | state:', state);
			return { ...state, blockLetters: action.payload.blockLetters };
		default:
			// console.log('DEFAULT | ', state);
			return state;
	}
}
