// ==============================================================
//  Eloquent Javascript, Chapter 4 - Objects and Arrays
//
//  http://eloquentjavascript.net/3rd_edition/04_data.html
// ==============================================================

(() => {

	// ============================================================================================
	//   The sum of a range
	// --------------------------------------------------------------------------------------------
	//
	//  Write a range function that takes two arguments, start and end, and returns an array
	//  containing all the numbers from start up to (and including) end.
	//
	//  Next, write a sum function that takes an array of numbers and returns the sum of these
	//  numbers. Run the example program and see whether it does indeed return 55.
	//
	//  As a bonus assignment, modify your range function to take an optional third argument that
	//  indicates the “step” value used when building the array. If no step is given, the elements
	//  go up by increments of one, corresponding to the old behavior. The function call
	//  range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure it also works with negative step
	//  values so that range(5, 2, -1) produces [5, 4, 3, 2].
	// ============================================================================================

	// Code Golf Version
	const range = (a, b, c = 1) => {
		let arr = [];

		for (let i = a; c > 0 ? (i <= b) : (i >= b); i += c) arr.push(i);

		return arr;
	}

	const sum = arr => arr.reduce((a, b) => a + b);

	// Overkilling version
	const range = (start = 0, end = 0, step = 1) => {
		if (step === 0) throw new TypeError('Step must not be zero!');

		const increment = Math.abs(step);

		let array = [];

		if (start < end) {
			for (let number = start; number <= end; number += increment) {
				array.push(number);
			}
		} else {
			for (let number = start; number >= end; number -= increment) {
				array.push(number);
			}
		}

		return array;
	}

	const sum = arr => arr.reduce((a, b) => a + b);
})();
