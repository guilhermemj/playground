// =========================================================
//  Eloquent Javascript, Chapter 5 - Higher-Order Functions
//
//  https://eloquentjavascript.net/05_higher_order.html
// =========================================================

(() => {

	// ============================================================================================
	//   Flattening
	// --------------------------------------------------------------------------------------------
	//
	//  Use the reduce method in combination with the concat method to “flatten” an array of
	//  arrays into a single array that has all the elements of the original arrays.
	// ============================================================================================

	let arrays = [[1, 2, 3], [4, 5], [6]];

	arrays.reduce((flatten, array) => flatten.concat(array), []);
})();

(() => {

	// =============================================================================================
	//   Your own loop
	// ---------------------------------------------------------------------------------------------
	//
	//  Write a higher-order function loop that provides something like a for loop statement. It
	//  takes a value, a test function, an update function, and a body function. Each iteration,
	//  it first runs the test function on the current loop value, and stops if that returns false.
	//  Then it calls the body function, giving it the current value. And finally, it calls the
	//  update function to create a new value, and starts from the beginning.
	//
	//  When defining the function, you can use a regular loop to do the actual looping.
	// =============================================================================================

	// While Version
	const loop = (value, test, update, body) => {
		while (test(value)) {
			body(value);

			value = update(value);
		}
	};

	// For Version
	const loop = (value, test, update, body) => {
		for (value; test(value); value = update(value)) {
			body(value);
		}
	};
})();

(() => {

	// =============================================================================================
	//   Everything
	// ---------------------------------------------------------------------------------------------
	//
	//  Analogous to the some method, arrays also have an every method. This one returns true when
	//  the given function returns true for every element in the array. In a way, some is a version
	//  of the || operator that acts on arrays, and every is like the && operator.
	//
	//  Implement every as a function that takes an array and a predicate function as parameters.
	//  Write two versions, one using a loop and one using the some method.
	// =============================================================================================

	// Loop version
	const every = (array, test) => {
		for (let element of array) {
			if (!test(element)) return false;
		}

		return true;
	};

	// Using some
	const every = (array, test) => !array.some((element) => !test(element));
})();

(() => {

	// =============================================================================================
	//   Dominant writing direction
	// ---------------------------------------------------------------------------------------------
	//
	//  Write a function that computes the dominant writing direction in a string of text. Remember
	//  that each script object has a direction property that can be "ltr" (left-to-right), "rtl"
	//  (right-to-left), or "ttb" (top-to-bottom).
	//
	//  The dominant direction is the direction of a majority of the characters which have a script
	//  associated with them. The characterScript and countBy functions defined earlier in the
	//  chapter are probably useful here.
	// =============================================================================================

	const getScriptDirection = (char) => {
		let script = characterScript(char.codePointAt(0));

		return script ? script.direction : 'unknown';
	};

	const hasKnownDirection = ({ name }) => name != 'unknown';

	const getDominantGroup = (group1, group2) => group1.count > group2.count ? group1 : group2;

	const dominantDirection = (text) => (
		countBy(text, getScriptDirection)
			.filter(hasKnownDirection)
			.reduce(getDominantGroup)
			.name
	);
})();
