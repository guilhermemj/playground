// =====================================================================
//  Eloquent Javascript, Chapter 2 - Program Structure
//
//  http://eloquentjavascript.net/3rd_edition/02_program_structure.html
// =====================================================================

(() => {

	// ==========================================================================================
	//   Looping a triangle
	//  ---------------------
	//
	//  Write a loop that makes seven calls to console.log to output the following triangle:
	//
	//  #
	//  ##
	//  ###
	//  ####
	//  #####
	//  ######
	//  #######
	//
	//  It may be useful to know that you can find the length of a string by writing `.length`
	//	after it.
	//
	//  let abc = "abc";
	//  console.log(abc.length);
	//  // → 3
	// ==========================================================================================

	// Code Golf version
	for (let str = '#'; str.length <= 7; str += '#') console.log(str);

	// Overkilling version
	const repeat = (fn, times = 1) => {
		for (let counter = 1; counter <= times; counter++) {
			fn(counter);
		}
	};

	const codeBlock = '#';
	let triangleString = '';

	repeat((counter) => {
		triangleString += `${codeBlock.repeat(counter)}\n`;
	}, 7);

	console.log(triangleString);
})();

(() => {

	// ==========================================================================================
	//   FizzBuzz
	//  -----------
	//
	//  Write a program that uses console.log to print all the numbers from 1 to 100, and
	//  with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number,
	//  for numbers divisible by 5 (and not 3), print "Buzz" instead.
	//
	//  When you have that working, modify your program to print "FizzBuzz", for numbers that
	//  are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible
	//  by only one of those).
	//
	//  (This is actually an interview question that has been claimed to weed out a significant
	//  percentage of programmer candidates. So if you solved it, your labor market value just
	//  went up.)
	// ==========================================================================================

	// Code Golf Version
	for (let i = 1; i <= 100; i++) {
		let str = '';

		if (!(i % 3)) str += 'Fizz';
		if (!(i % 5)) str += 'Buzz';

		console.log(str || i);
	}

	// Overkilling Version
	const isDivisible = (dividend, divider) => !(dividend % divider);

	const createArray = (elementCreator, length) => {
		let array = [];

		for (let index = 0; index < length; index++) {
			array.push(elementCreator(index));
		}

		return array;
	};

	const defaultDictionary = {
		3: 'Fizz',
		5: 'Buzz',
	};

	const UltimateFizzBuzz = (limit = 10, dictionary = defaultDictionary) => {
		const createLine = (number) => {
			const dividers = Object.keys(dictionary).filter((key) => isDivisible(number, Number(key)));

			return (!!dividers.length ?
				dividers.reduce((line, key) => line + dictionary[key], '') :
				number
			);
		};

		return createArray((index) => createLine(index + 1), limit);
	};

	console.log(UltimateFizzBuzz(100).join('\n'));
})();
