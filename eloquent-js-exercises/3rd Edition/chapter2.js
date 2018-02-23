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
	const repeat = (fn, times) => {
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
