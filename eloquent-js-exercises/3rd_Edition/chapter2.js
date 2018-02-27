// ======================================================================
//  Eloquent Javascript, Chapter 2 - Program Structure
//
//  http://eloquentjavascript.net/3rd_edition/02_program_structure.html
// ======================================================================

(() => {

	// ==========================================================================================
	//   Looping a triangle
	// ------------------------------------------------------------------------------------------
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
	for (let str = '#'; str.length < 8; str += '#') console.log(str);

	// Overkilling version
	const repeat = (fn, times = 1) => {
		for (let counter = 0; counter < times; counter++) {
			fn(counter);
		}
	};

	repeat((counter) => {
		console.log('#'.repeat(counter + 1));
	}, 7);
})();

(() => {

	// ==========================================================================================
	//   FizzBuzz
	// ------------------------------------------------------------------------------------------
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

	const createArray = (elementCreator, length = 0) => {
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

(() => {

	// =============================================================================================
	//   Chess board
	// ---------------------------------------------------------------------------------------------
	//
	//  Write a program that creates a string that represents an 8×8 grid, using newline
	//  characters to separate lines. At each position of the grid there is either a space or
	//  a "#" character. The characters should form a chess board.
	//
	//  Passing this string to console.log should show something like this:
	//   # # # #
	//  # # # #
	//   # # # #
	//  # # # #
	//   # # # #
	//  # # # #
	//   # # # #
	//  # # # #
	//
	//  When you have a program that generates this pattern, define a binding size = 8 and change
	//  the program so that it works for any size, outputting a grid of the given width and height.
	// =============================================================================================

	// Code Golf Version
	let size = 8, str = '';

	for (let i = 0; i < size; i++) {
		if (!!i) str += '\n';

		for (let j = 0; j < size; j++) {
			str += (i + j) % 2 ? '#' : ' ';
		}
	}

	console.log(str);

	// Overkilling Version
	const repeat = (fn, times = 1) => {
		for (let counter = 0; counter < times; counter++) {
			fn(counter);
		}
	};

	const generateChessBoard = (size = 8) => {
		const getPositionChar = (rowIndex, columnIndex) => (rowIndex + columnIndex) % 2 ? '#' : ' ';

		let board = '';

		repeat((rowIndex) => {
			if (!!rowIndex) board += '\n';

			repeat((columnIndex) => {
				board += getPositionChar(rowIndex, columnIndex);
			}, size)
		}, size)

		return board;
	}

	console.log(generateChessBoard());
})();
