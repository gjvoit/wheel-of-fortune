import {
	UPDATE_STATES,
	UPDATE_LETTERS
} from './types';

export function updateLetters(blockLetters) {
	// console.log('updateLetters called')
	return {
		type: UPDATE_LETTERS,
		payload: { blockLetters }
	}
}

export function updateStates(blockStates) {
	// console.log('updateStates called')
	return {
		type: UPDATE_STATES,
		payload: { blockStates }
	}
}
