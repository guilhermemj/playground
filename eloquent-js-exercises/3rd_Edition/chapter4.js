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

	const sum = (array) => array.reduce(
		(total, currentValue) => total + currentValue
	);
})();

(() => {

	// ================================================================================================
	//   Reversing an array
	// ------------------------------------------------------------------------------------------------
	//
	//  Arrays have a reverse method which changes the array by inverting the order in which its
	//  elements appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace.
	//  The first, reverseArray, takes an array as argument and produces a new array that has the
	//  same elements in the inverse order. The second, reverseArrayInPlace, does what the reverse
	//  method does: it modifies the array given as argument by reversing its elements. Neither may
	//  use the standard reverse method.
	//
	//  Thinking back to the notes about side effects and pure functions in the previous chapter,
	//  which variant do you expect to be useful in more situations? Which one runs faster?
	// ================================================================================================

	const reverseArray = (array) => {
		const newArray = [];

		for (let index = array.length - 1; index >= 0; index--) {
			newArray.push(array[index]);
		}

		return newArray;
	};

	const reverseArrayInPlace = (array) => {
		const swapElements = (index1, index2) => {
			let aux = array[index1];

			array[index1] = array[index2];
			array[index2] = aux;
		}

		const lastIndex   = array.length - 1;
		const middleIndex = Math.floor(lastIndex / 2);

		for (let index = 0; index < middleIndex; index++) {
			swapElements(index, lastIndex - index);
		}
	}
})();

(() => {

	// =============================================================================================
	//   A list
	// ---------------------------------------------------------------------------------------------
	//
	//  Objects, as generic blobs of values, can be used to build all sorts of data structures. A
	//  common data structure is the list (not to be confused with array). A list is a nested set
	//  of objects, with the first object holding a reference to the second, the second to the
	//  third, and so on.
	//
	//  let list = {
	//  	value: 1,
	//  	rest: {
	//  		value: 2,
	//  		rest: {
	//  			value: 3,
	//  			rest: null
	//  		}
	//  	}
	//  };
	//
	//  A nice thing about lists is that they can share parts of their structure. For example,
	//  if I create two new values {value: 0, rest: list} and {value: -1, rest: list} (with list
	//  referring to the binding defined earlier), they are both independent lists, but they share
	//  the structure that makes up their last three elements. The original list is also still a
	//  valid three-element list.
	//
	//  Write a function arrayToList that builds up a list structure like the one shown when given
	//  [1, 2, 3] as argument. Also write a listToArray function that produces an array from a list.
	//  Then, add a helper function prepend, which takes an element and a list and creates a new
	//  list that adds the element to the front of the input list, and nth, which takes a list and
	//  a number and returns the element at the given position in the list (with zero referring to
	//  the first element) or undefined when there is no such element.
	// =============================================================================================

	const prepend = (element, list) => ({
		value: element,
		rest: list || null,
	});

	const nth = (list, index) => {
		let counter = 0;

		for (let node = list; node !== null; node = node.rest) {
			if (counter === index) return node.value;

			if (counter > index) break;

			counter++;
		}
	};

	const arrayToList = (array) => array.reduceRight(
		(list, element) => prepend(element, list),
		null,
	);

	const listToArray = (list) => {
		const array = [];

		for (let node = list; node !== null; node = node.rest) {
			array.push(node.value);
		}

		return array;
	};
})();

(() => {

	// =============================================================================================
	//   A list
	// ---------------------------------------------------------------------------------------------
	//
	//  The == operator compares objects by identity. But sometimes, you would prefer to compare
	//  the values of their actual properties.
	//
	//  Write a function, deepEqual, that takes two values and returns true only if they are the
	//  same value or are objects with the same properties, where the values of the properties are
	//  equal when compared with a recursive call to deepEqual.
	//
	//  To find out whether to compare two things by identity (use the === operator for that) or by
	//  looking at their properties, you can use the typeof operator. If it produces "object" for
	//  both values, you should do a deep comparison. But you have to take one silly exception into
	//  account: because of a historical accident, typeof null also produces "object".
	//
	//  The Object.keys function will be useful when you need to go over the properties of objects
	//  to compare them.
	// =============================================================================================

	// Code Golf version
	const deepEqual = (obj1, obj2) => Object.keys(obj1).every(
		k => typeof obj1[k] === 'object' ? deepEqual(obj1[k], obj2[k]) : obj1[k] === obj2[k]
	);

	// Overkiling version
	const deepEqual = (object1, object2) => {
		if (typeof object1 !== 'object' || object1 === null) {
			return object1 === object2;
		}

		const object1Keys = Object.keys(object1);

		if (object1Keys.length !== Object.keys(object2).length) {
			return false;
		}

		return object1Keys.every(
			(key) => object2.hasOwnProperty(key) && deepEqual(object1[key], object2[key])
		);
	}
})();
