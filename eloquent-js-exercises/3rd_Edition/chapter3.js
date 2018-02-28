// ==============================================================
//  Eloquent Javascript, Chapter 3 - Functions
//
//  http://eloquentjavascript.net/3rd_edition/03_functions.html
// ==============================================================

(() => {

	// ==========================================================================================
	//   Minimum
	// ------------------------------------------------------------------------------------------
	//
	//  The previous chapter introduced the standard function Math.min that returns its smallest
	//  argument. We can build something like that now. Write a function min that takes two
	//  arguments and returns their minimum.
	// ==========================================================================================

	const min = (a, b) => a < b ? a : b;
})();

(() => {

	// ==========================================================================================
	//   Recursion
	// ------------------------------------------------------------------------------------------
	//
	//  We’ve seen that % (the remainder operator) can be used to test whether a number is even
	//  or odd by using % 2 to see whether it’s divisible by two. Here’s another way to define
	//  whether a positive whole number is even or odd:
	//
	//	- Zero is even.
	//	- One is odd.
	//	- For any other number N, its evenness is the same as N - 2.
	//
	//	Define a recursive function isEven corresponding to this description. The function
	//  should accept a single parameter (a positive, whole number) and return a Boolean.
	//
	//  Test it on 50 and 75. See how it behaves on -1. Why? Can you think of a way to fix this?
	// ==========================================================================================

	// Code golf version
	const isEven = n => n === 0 || (n !== 1 && isEven(Math.abs(n - 2)));

	// Overkilling version
	const isEven = (number) => {
		const convertedNumber = Number(number);

		if (isNaN(convertedNumber) || !isFinite(convertedNumber)) {
			throw new TypeError(`${number} is not a valid number.`);
		}

		const absoluteNumber = Math.abs(convertedNumber);

		if (absoluteNumber === 0) return true;
		if (absoluteNumber === 1) return false;

		return isEven(absoluteNumber - 2);
	}
})();

(() => {

	// ==========================================================================================
	//   Bean counting
	// ------------------------------------------------------------------------------------------
	//
	//  You can get the Nth character, or letter, from a string by writing "string"[N].
	//  The returned value will be a string containing only one character (for example, "b").
	//  The first character has position zero, which causes the last one to be found at position
	//  string.length - 1. In other words, a two-character string has length 2, and its
	//  characters have positions 0 and 1.
	//
	//  Write a function countBs that takes a string as its only argument and returns a number
	//  that indicates how many uppercase “B” characters there are in the string.
	//
	//  Next, write a function called countChar that behaves like countBs, except it takes a
	//  second argument that indicates the character that is to be counted (rather than counting
	//  only uppercase “B” characters). Rewrite countBs to make use of this new function.
	// ==========================================================================================

	// Code golf version
	const countChar = (str, char) => (str.match(new RegExp(char, 'g')) || []).length;
	const countBs   = str => countChar(str, 'B');

	// Overkilling version
	const countChar = (string, target) => {
		return Array.prototype.reduce.call(
			string,
			(count, char) => char === target ? count + 1 : count,
			0,
		);
	}

	const countBs = (string) => countChar(string, 'B');
})();
