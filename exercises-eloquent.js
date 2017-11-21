
// ==========================================================
//  Eloquent Javascript, Chapter 2 - Program Structure
//
//  http://eloquentjavascript.net/02_program_structure.html
// ==========================================================
(function() {
    'use strict';

    // ================================================================================
    //  Eloquent Javascript Exercises - Chess Board Generator
    //
    //  Write a program that creates a string that represents an 8×8 grid, using
    //  newline characters to separate lines. At each position of the grid there is
    //  either a space or a “#” character. The characters should form a chess board.
    //
    //  When you have a program that generates this pattern, define a variable
    //  size = 8 and change the program so that it works for any size, outputting
    //  a grid of the given width and height.
    // ================================================================================

    /**
     *  Creates a string that represents a chess board of given width.
     *
     *  @param {Number} size - The width of the grid.
     *
     *  @returns {String} - String that represents the grid.
     */
    function createChessBoard(size) {
        var str = '';

        for (var i = 0; i < size; i++) {
            // Add newlines between rows
            if (i) str += '\n';

            // Generate the pattern
            for (var j = 0; j < size; j++) {
                str += (i + j) % 2 ? ' ' : '#';
            }
        }

        return str;
    }

}());


// ==================================================
//  Eloquent Javascript, Chapter 3 - Functions
//
//  http://eloquentjavascript.net/03_functions.html
// ==================================================
(function() {
    "use strict";

    // ================================================================================
    //  Eloquent Javascript Exercises - Recursive Evenness
    // 
    //  We’ve seen that % (the remainder operator) can be used to test whether a
    //  number is even or odd by using % 2 to check whether it’s divisible by two.
    //
    //  Here’s another way to define whether a positive whole number is even or odd:
    //
    //    - Zero is even.
    //    - One is odd.
    //    - For any other number N, its evenness is the same as N - 2.
    //
    //  Define a recursive function isEven corresponding to this description.
    //  The function should accept a number parameter and return a Boolean.
    //
    //  Test it on 50 and 75. See how it behaves on -1. Why? Can you think of a way
    //  to fix this?
    // ================================================================================

    /**
     *  Check if a number is even recursively.
     *
     *  @param {Number} number - Number to be check.
     *
     *  @returns {Boolean} - Evenness of number.
     */
    function isEven(number) {
        if (number == 0) return true;
        if (number == 1) return false;

        return isEven( number + (number > 1 ? -2 : 2) );
    }
    
    // ==========================================================================================
    //  Eloquent Javascript Exercises - Bean Counting
    //
    //  You can get the Nth character, or letter, from a string by writing "string".charAt(N),
    //  similar to how you get its length with "s".length. The returned value will be a string
    //  containing only one character (for example, "b"). The first character has position
    //  zero, which causes the last one to be found at position string.length - 1. In other words,
    //  a two-character string has length 2, and its characters have positions 0 and 1.
    //
    //  Write a function countBs that takes a string as its only argument and returns a number
    //  that indicates how many uppercase “B” characters are in the string.
    //
    //  Next, write a function called countChar that behaves like countBs, except it takes a
    //  second argument that indicates the character that is to be counted (rather than counting
    //  only uppercase “B” characters). Rewrite countBs to make use of this new function.
    // ==========================================================================================

    /**
     *  Count occurrencies of char 'B' in a string.
     *
     *  @param {String} str - 'Haystack' string.
     *
     *  @returns {Number} - Occurrencies of 'B'.
     */
    function countBs(str) {
        return countChar(str, 'B');
    }

    /**
     *  Count occurrencies of given char in a string.
     *
     *  @param {String} str  - 'Haystack' string.
     *  @param {String} char - Char to be count.
     *
     *  @returns {Number} - Occurrencies of `char`.
     */
    function countChar(str, char) {
        var ret = 0;

        for (var i = 0, l = str.length; i < l; i++) {
            if (str.charAt(i) == char) ret++;
        }

        return ret;
    }


    //  Recursive Approach
    // ======================

    /**
     *  Count occurrencies of given char in a string, recursively.
     *
     *  @param {String} str  - 'Haystack' string.
     *  @param {String} char - Char to be count.
     *
     *  @returns {Number} - Occurrencies of `char`.
     */
    function countCharRecursively(str, char) {
        if (!str.length) return 0;
        
        return (str.charAt(i) == char ? 1 : 0) + countCharRecursively(str.substring(1), char);
    }
  
    /**
     *  Encapsulates and correctly initiates the recursive, no-substring, function.
     *
     *  @param {String} str  - 'Haystack' string.
     *  @param {String} char - Char to be count.
     *
     *  @returns {Number} - Occurrencies of `char`.
     */
    function countCharNoSubstring(str, char) {
        return trueCountCharNoSubstring(str, char, str.length - 1);
    }
  
    /**
     *  Count occurrencies of given char in a string, recursively, without using `substring`.
     *
     *  @param {String} str   - 'Haystack' string.
     *  @param {String} char  - Char to be count.
     *  @param {Number} i     - Index of current char.
     *
     *  @returns {Number} - Occurrencies of `char`.
     *
     *  @private
     */
    function trueCountCharNoSubstring(str, char, i) {
        if (i < 0) return 0;

        return (str.charAt(i) == char ? 1 : 0) + trueCountCharNoSubstring(str, char, i - 1);
    }

}());


// =======================================================================
//  Eloquent Javascript, Chapter 4 - Data Structures: Objects and Arrays
//
//  http://eloquentjavascript.net/04_data.html
// =======================================================================
(function() {

    // ==========================================================================================
    //  Eloquent Javascript Exercises - The sum of a range
    //
    //  Write a range function that takes two arguments, start and end, and returns an array
    //  containing all the numbers from start up to (and including) end.
    //
    //  Next, write a sum function that takes an array of numbers and returns the sum of these
    //  numbers. Run the previous program and see whether it does indeed return 55.
    //
    //  As a bonus assignment, modify your range function to take an optional third argument
    //  that indicates the “step” value used to build up the array. If no step is given, the
    //  array elements go up by increments of one, corresponding to the old behavior. The
    //  function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure it also works
    //  with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].
    // ==========================================================================================

    /**
     *  Create an array with numbers within given range.
     *
     *  @param {Number} start       - Start of range.
     *  @param {Number} end         - End of range.
     *  @param {Number} [step = 1]  - Increment step.
     *
     *  @returns {Number[]} - Filled array.
     */
    const range = (start, end, step) => {
        let arr = [];

        if (start > end) {
            for (let i = start; i >= end; i += (step || -1)) arr.push(i);
        } else {
            for (let i = start; i <= end; i += (step || 1)) arr.push(i);
        }

        return arr;
    };

    /**
     *  Sum numbers of given array.
     *
     *  @param {Number[]} numberArr - Input array.
     *
     *  @returns {Number} - Result.
     */
    const sum = numberArr => numberArr.reduce( (a, b) => a + b );


    // ============================================================================================
    //  Eloquent Javascript Exercises - Reversing an array
    //
    //  Arrays have a method reverse, which changes the array by inverting the order in which
    //  its elements appear. For this exercise, write two functions, reverseArray and
    //  reverseArrayInPlace. The first, reverseArray, takes an array as argument and produces
    //  a new array that has the same elements in the inverse order. The second,
    //  reverseArrayInPlace, does what the reverse method does: it modifies the array given as
    //  argument in order to reverse its elements. Neither may use the standard reverse method.
    //
    //  Thinking back to the notes about side effects and pure functions in the previous chapter,
    //  which variant do you expect to be useful in more situations? Which one is more efficient?
    // ============================================================================================

    /**
     *  Returns a new array reversed from input.
     *
     *  @param {*[]} arr - Input array.
     *
     *  @returns {*[]} - New reversed array.
     */
    const reverseArray = arr => {
        let revArr = [];

        for (let i = arr.length - 1; i >= 0; i--) {
            revArr.push(arr[i]);
        }
        
        return revArr;
	};
	
	/**
	 *  Reverse given array.
	 *
	 *  @param {*[]} arr - Array to be reversed.
	 */
	const reverseArrayInPlace = arr => {
		let aux,
			endIndex = arr.length - 1,
			midIndex = Math.floor( endIndex / 2 );

		for (let i = 0; i < midIndex; i++ ) {
			aux = arr[i];
			arr[i] = arr[ endIndex - i ];
			arr[ endIndex - i ] = aux;
		}
	};


	// ==========================================================================================
	//  Eloquent Javascript Exercises - A list
	//
	//  Objects, as generic blobs of values, can be used to build all sorts of data structures.
	//  A common data structure is the list (not to be confused with the array). A list is a
	//  nested set of objects, with the first object holding a reference to the second, the
	//	second to the third, and so on.
	//
	//  A nice thing about lists is that they can share parts of their structure. For example,
	//  if I create two new values {value: 0, rest: list} and {value: -1, rest: list} (with
	//  list referring to the variable defined earlier), they are both independent lists, but
	//  they share the structure that makes up their last three elements. In addition, the
	//	original list is also still a valid three-element list.
	//
	//  Write a function arrayToList that builds up a data structure like the previous one when
	//  given [1, 2, 3] as argument, and write a listToArray function that produces an array
	//  from a list. Also write the helper functions prepend, which takes an element and a list
	//  and creates a new list that adds the element to the front of the input list, and nth,
	//  which takes a list and a number and returns the element at the given position in the
	//	list, or undefined when there is no such element.
	//
	//  If you haven’t already, also write a recursive version of nth.
	// ==========================================================================================

	/**
	 *  Convert an array to a list.
	 *
	 *  @param {*[]} arr - Array to be converted.
	 *
	 *  @returns {Object} - The list that represents the Array.
	 */
	const arrayToList = arr => {
		let list = null;

		for (i = arr.length - 1; i >= 0; i--) {
			list = {value: arr[i], rest: list};
		}

		return list;
	};

	/**
	 *  Prepend an element to a list.
	 *
	 *  @param {*}      elem - Element to be prepended.
	 *  @param {Object} list - List that will receive the new element.
	 *
	 *  @returns {Object} The new list with the prepended element.
	 */
	const prepend = (elem, list) => ({
		value: elem,
		rest: list
	});

	/**
	 *  Convert a list to an array.
	 *
	 *  @param {Object} list - The list to be converted.
	 *
	 *  @returns {*[]} - Array representing the list.
	 */
	const listToArray = list => {
		let arr = [];

		for (let node = list; node; node = node.rest) {
			arr.push(node.value);
		}

		return arr;
	};

	/**
	 *  Recover nth item of given list.
	 *
	 *  @param {Object} list  - Input list.
	 *  @param {Number} index - Position of the desired item.
	 *
	 *  @returns {*} - Value of nth item in list.
	 */
	const nth = (list, index) => {
		if (index === 0) return list.value;
		if (!list.rest || index < 0) return undefined;

		return nth(list.rest, index - 1);
	};


	// ==========================================================================================
	//  Eloquent Javascript Exercises - Deep comparison
	//
	//  The == operator compares objects by identity. But sometimes, you would prefer to compare
	//  the values of their actual properties.
	//
	//  Write a function, deepEqual, that takes two values and returns true only if they are the
	//  same value or are objects with the same properties whose values are also equal when
	//  compared with a recursive call to deepEqual.
	//  To find out whether to compare two things by identity (use the === operator for that) or
	//  by looking at their properties, you can use the typeof operator. If it produces "object"
	//  for both values, you should do a deep comparison. But you have to take one silly
	//  exception into account: by a historical accident, typeof null also produces "object".
	// ==========================================================================================

	/**
	 *  Deeply compare two entities.
	 *
	 *  @param {*} a - First entity of comparison.
	 *  @param {*} b - Second entity of comparison.
	 *
	 *  @returns {Boolean} - Equality between both entities.
	 */
	function deepEqual(a, b) {
		if (
			typeof a == 'object' && a != null &&
			typeof b == 'object' && b != null
		) {
			if (Object.keys(a).length != Object.keys(b).length) return false;

			for (let i in a) {
				if ( !deepEqual( a[i], b[i] ) ) return false;
			}

			return true;
		}

		return a === b;
	}
}());


// ==========================================================
//  Eloquent Javascript, Chapter 5 - Higher-Order Functions
//
//  http://eloquentjavascript.net/05_higher_order.html
// ==========================================================
(function() {

	const ancestry = [
		{"name":"Carolus Haverbeke","sex":"m","born":1832,"died":1905,"father":"Carel Haverbeke",
		"mother":"Maria van Brussel"},{"name":"Emma de Milliano","sex":"f","born":1876,"died":1956,
		"father":"Petrus de Milliano","mother":"Sophia van Damme"},{"name":"Maria de Rycke","sex":"f",
		"born":1683,"died":1724,"father":"Frederik de Rycke","mother":"Laurentia van Vlaenderen"},
		{"name":"Jan van Brussel","sex":"m","born":1714,"died":1748,"father":"Jacobus van Brussel",
		"mother":"Joanna van Rooten"},{"name":"Philibert Haverbeke","sex":"m","born":1907,"died":1997,
		"father":"Emile Haverbeke","mother":"Emma de Milliano"},{"name":"Jan Frans van Brussel","sex":"m",
		"born":1761,"died":1833,"father":"Jacobus Bernardus van Brussel","mother":null},
		{"name":"Pauwels van Haverbeke","sex":"m","born":1535,"died":1582,"father":"N. van Haverbeke",
		"mother":null},{"name":"Clara Aernoudts","sex":"f","born":1918,"died":2012,"father":"Henry Aernoudts",
		"mother":"Sidonie Coene"},{"name":"Emile Haverbeke","sex":"m","born":1877,"died":1968,
		"father":"Carolus Haverbeke","mother":"Maria Sturm"},{"name":"Lieven de Causmaecker","sex":"m",
		"born":1696,"died":1724,"father":"Carel de Causmaecker","mother":"Joanna Claes"},
		{"name":"Pieter Haverbeke","sex":"m","born":1602,"died":1642,"father":"Lieven van Haverbeke",
		"mother":null},{"name":"Livina Haverbeke","sex":"f","born":1692,"died":1743,"father":"Daniel Haverbeke",
		"mother":"Joanna de Pape"},{"name":"Pieter Bernard Haverbeke","sex":"m","born":1695,"died":1762,
		"father":"Willem Haverbeke","mother":"Petronella Wauters"},{"name":"Lieven van Haverbeke","sex":"m",
		"born":1570,"died":1636,"father":"Pauwels van Haverbeke","mother":"Lievijne Jans"},
		{"name":"Joanna de Causmaecker","sex":"f","born":1762,"died":1807,"father":"Bernardus de Causmaecker",
		"mother":null},{"name":"Willem Haverbeke","sex":"m","born":1668,"died":1731,"father":"Lieven Haverbeke",
		"mother":"Elisabeth Hercke"},{"name":"Pieter Antone Haverbeke","sex":"m","born":1753,"died":1798,
		"father":"Jan Francies Haverbeke","mother":"Petronella de Decker"},{"name":"Maria van Brussel","sex":"f",
		"born":1801,"died":1834,"father":"Jan Frans van Brussel","mother":"Joanna de Causmaecker"},
		{"name":"Angela Haverbeke","sex":"f","born":1728,"died":1734,"father":"Pieter Bernard Haverbeke",
		"mother":"Livina de Vrieze"},{"name":"Elisabeth Haverbeke","sex":"f","born":1711,"died":1754,
		"father":"Jan Haverbeke","mother":"Maria de Rycke"},{"name":"Lievijne Jans","sex":"f","born":1542,
		"died":1582,"father":null,"mother":null},{"name":"Bernardus de Causmaecker","sex":"m","born":1721,
		"died":1789,"father":"Lieven de Causmaecker","mother":"Livina Haverbeke"},{"name":"Jacoba Lammens",
		"sex":"f","born":1699,"died":1740,"father":"Lieven Lammens","mother":"Livina de Vrieze"},
		{"name":"Pieter de Decker","sex":"m","born":1705,"died":1780,"father":"Joos de Decker",
		"mother":"Petronella van de Steene"},{"name":"Joanna de Pape","sex":"f","born":1654,"died":1723,
		"father":"Vincent de Pape","mother":"Petronella Wauters"},{"name":"Daniel Haverbeke","sex":"m",
		"born":1652,"died":1723,"father":"Lieven Haverbeke","mother":"Elisabeth Hercke"},
		{"name":"Lieven Haverbeke","sex":"m","born":1631,"died":1676,"father":"Pieter Haverbeke",
		"mother":"Anna van Hecke"},{"name":"Martina de Pape","sex":"f","born":1666,"died":1727,
		"father":"Vincent de Pape","mother":"Petronella Wauters"},{"name":"Jan Francies Haverbeke","sex":"m",
		"born":1725,"died":1779,"father":"Pieter Bernard Haverbeke","mother":"Livina de Vrieze"},
		{"name":"Maria Haverbeke","sex":"m","born":1905,"died":1997,"father":"Emile Haverbeke",
		"mother":"Emma de Milliano"},{"name":"Petronella de Decker","sex":"f","born":1731,"died":1781,
		"father":"Pieter de Decker","mother":"Livina Haverbeke"},{"name":"Livina Sierens","sex":"f","born":1761,
		"died":1826,"father":"Jan Sierens","mother":"Maria van Waes"},{"name":"Laurentia Haverbeke","sex":"f",
		"born":1710,"died":1786,"father":"Jan Haverbeke","mother":"Maria de Rycke"},{"name":"Carel Haverbeke",
		"sex":"m","born":1796,"died":1837,"father":"Pieter Antone Haverbeke","mother":"Livina Sierens"},
		{"name":"Elisabeth Hercke","sex":"f","born":1632,"died":1674,"father":"Willem Hercke",
		"mother":"Margriet de Brabander"},{"name":"Jan Haverbeke","sex":"m","born":1671,"died":1731,
		"father":"Lieven Haverbeke","mother":"Elisabeth Hercke"},{"name":"Anna van Hecke","sex":"f","born":1607,
		"died":1670,"father":"Paschasius van Hecke","mother":"Martijntken Beelaert"},{"name":"Maria Sturm",
		"sex":"f","born":1835,"died":1917,"father":"Charles Sturm","mother":"Seraphina Spelier"},
		{"name":"Jacobus Bernardus van Brussel","sex":"m","born":1736,"died":1809,"father":"Jan van Brussel",
		"mother":"Elisabeth Haverbeke"}
	];
	
	// ==========================================================================================
	//  Eloquent Javascript Exercises - Mother-child age difference
	//
	//  Using the example data set from this chapter, compute the average age difference between
	//  mothers and children (the age of the mother when the child is born). You can use the
	//  average function defined earlier in this chapter.
	//
	//  Note that not all the mothers mentioned in the data are themselves present in the array.
	//  The byName object, which makes it easy to find a person’s object from their name, might
	//  be useful here.
	// ==========================================================================================

	/**
	 *  Get average value of a set of numbers.
	 * 
	 *  @param {Number[]} array - Input array.
	 *
	 *  @returns {Number} - Average value.
	 */
	const average = array => (array.reduce( (a, b) => a + b ) / array.length);

	// ~Create an object with people mapped by name.~
	// Create a Map<name, person> from ancestry
	let byName = new Map();
	ancestry.forEach( person => byName.set(person.name, person) );

	// NOTE: Auxiliary self-explanatory functions created because they are the focus of this chapter.
	const hasValidMother = person => (typeof byName.get(person.mother) != 'undefined');
	const motherChildAgeDiference = person => (person.born - byName.get(person.mother).born);

	// Calculate average motherChildDiference in ancestry data set.
	const calcAverageMotherChildAgeDiference = () => average(
		ancestry.filter( hasValidMother ).map( motherChildAgeDiference )
	);


	// ============================================================================================
	//  Eloquent Javascript Exercises - Historical life expectancy
	//
	//  When we looked up all the people in our data set that lived more than 90 years, only the
	//  latest generation in the data came out. Let’s take a closer look at that phenomenon.
	//
	//  Compute and output the average age of the people in the ancestry data set per century.
	//  A person is assigned to a century by taking their year of death, dividing it by 100, and
	//  rounding it up, as in Math.ceil(person.died / 100).
	//
	//  For bonus points, write a function groupBy that abstracts the grouping operation. It
	//  should accept as arguments an array and a function that computes the group for an element
	//  in the array and returns an object that maps group names to arrays of group members.
	// ============================================================================================

	/**
	 *  Group array items by given method.
	 *
	 *  @param {Object[]} array  - Input array.
	 *  @param {Function} method - Grouping method.
	 *
	 *  @returns {Map<String, Object>} - Group Map.
	 */
	const groupBy = (array, method) => {
		let groupMap = new Map();

		array.forEach(item => {
			let key = method(item).toString();

			if ( !groupMap.has(key) ) groupMap.set(key, []);

			groupMap.get(key).push(item);
		});

		return groupMap;
	};

	const getCentury = person => Math.ceil(person.died / 100);
	const getAge = person => (person.died - person.born);

	// Create an object with people grouped by century.
	let ancestryByCentury = groupBy(ancestry, getCentury);

	const getAverageAgeByCentury = century => average(
		Array.from( ancestryByCentury.get( century.toString() ) ).map(getAge)
	);

	// for (let i = 16; i <= 21; i++) {
	// 	console.log( i + ': ' + getAverageAgeByCentury(i) );
	// }

	// ==========================================================================================
	//  Eloquent Javascript Exercises - Every and then some
	//
	//  Arrays also come with the standard methods every and some. Both take a predicate function
	//  that, when called with an array element as argument, returns true or false. Just like &&
	//  returns a true value only when the expressions on both sides are true, every returns true
	//  only when the predicate returns true for all elements of the array. Similarly, some
	//  returns true as soon as the predicate returns true for any of the elements. They do not
	//  process more elements than necessary—for example, if some finds that the predicate holds
	//  for the first element of the array, it will not look at the values after that.
	//
	//  Write two functions, every and some, that behave like these methods, except that they
	//  take the array as their first argument rather than being a method.
	// ==========================================================================================

	/**
	 *  Test whether all elements in the array pass the test implemented by the provided function.
	 *
	 *  @param {*[]} 	  arr - Input array.
	 *  @param {Function} fn  - Function to test for each element.
	 *
	 *  @returns {Boolean} - `true` if the callback function returns a truthy value for every array
	 *                        element; otherwise, `false`.
	 */
	const every = (arr, fn) => {
		for (let i = 0; i < arr.length; i++) {
			if (!fn( arr[i] )) return false;
		}

		return true;
	};

	/**
	 *  Test whether at least one element in the array passes the test implemented by the provided
	 *  function.
	 *
	 *  @param {*[]} 	  arr - Input array.
	 *  @param {Function} fn  - Function to test for each element.
	 *
	 *  @returns {Boolean} - `true` if the callback function returns a truthy value for any array
	 *                        element; otherwise, `false`.
	 */
	const some = (arr, fn) => {
		for (let i = 0; i < arr.length; i++) {
			if (fn( arr[i] )) return true;
		}
	
		return false;
	};
}());


// ==============================================================
//  Eloquent Javascript, Chapter 6 - The Secret Life of Objects
//
//  http://eloquentjavascript.net/06_object.html
// ==============================================================
(function() {

	// ==========================================================================================
	//  Eloquent Javascript Exercises - A vector type
	//
	//  Write a constructor Vector that represents a vector in two-dimensional space. It takes x
	//  and y parameters (numbers), which it should save to properties of the same name.
	//
	//  Give the Vector prototype two methods, plus and minus, that take another vector as a
	//  parameter and return a new vector that has the sum or difference of the two vectors’
	//  (the one in this and the parameter) x and y values.
	//
	//  Add a getter property length to the prototype that computes the length of the vector —
	//  that is, the distance of the point (x, y) from the origin (0, 0).
	// ==========================================================================================

	const Vector = function(x, y) {
		this.x = x;
		this.y = y;
	};

	Vector.prototype = {
		
		get length() {
			return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
		},
		
		plus: function(vector) {
			return new Vector( this.x + vector.x, this.y + vector.y );
		},

		minus: function(vector) {
			return new Vector( this.x - vector.x, this.y - vector.y );
		},
	}

	//  ES6 Approach
	// ===============
	
	class VectorES6 {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		get length() {
			return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
		}

		plus(vector) {
			return new VectorES6( this.x + vector.x, this.y + vector.y );
		}

		minus(vector) {
			return new VectorES6( this.x - vector.x, this.y - vector.y );
		}
	}
}());


// ============================================================
//  Eloquent Javascript, Chapter 7 - Project: Electronic Life
//
//  http://eloquentjavascript.net/07_elife.html
// ============================================================
(function() {
  
    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        plus(other) {
            return new Vector(this.x + other.x, this.y + other.y);
        }
    }

    const DIRECTIONS = new Map([
        ["n",  new Vector( 0, -1)],
        ["ne", new Vector( 1, -1)],
        ["e",  new Vector( 1,  0)],
        ["se", new Vector( 1,  1)],
        ["s",  new Vector( 0,  1)],
        ["sw", new Vector(-1,  1)],
        ["w",  new Vector(-1,  0)],
        ["nw", new Vector(-1, -1)]
    ]);

    const DIRECTION_NAMES = "n ne e se s sw w nw".split(" ");

    const randomElement = arr => arr[ Math.floor(Math.random() * arr.length) ];

    const elementFromChar = (legend, ch) => {
        if (ch === ' ') return null;

        let element = new legend[ch]();

        element.originChar = ch;

        return element;
    };

    const charFromElement = element => element == null ? ' ' : element.originChar;

    class Grid {
        constructor(width, height) {
            this.space = new Array(width * height);
            this.width = width;
            this.height = height;
        }

        isInside(vector) {
            return  vector.x >= 0 && vector.x < this.width &&
                    vector.y >= 0 && vector.y < this.height;
        }

        get(vector) {
            return this.space[ vector.x + this.width * vector.y ];
        }

        set(vector, value) {
            this.space[ vector.x + this.width * vector.y ] = value;
        }

        forEach(f, context) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    let vector = new Vector(x, y);
                    let value = this.get(vector);

                    if (value !== null) f.call(context, value, vector);
                }
            }
        }
    }

    class View {
        constructor(world, vector) {
            this.world = world;
            this.vector = vector;
        }

        look(dir) {
            let target = this.vector.plus( DIRECTIONS.get(dir) );
            
            return this.world.grid.isInside(target) ?
                charFromElement( this.world.grid.get(target) ) :
                '#'
        }

        findAll(ch) {
            let found = [];

            Array.from( DIRECTIONS.keys() ).forEach(dir => {
                if (this.look(dir) == ch) found.push(dir);
            });

            return found;
        }

        find(ch) {
            let found = this.findAll(ch);

            return found.length ?
                randomElement(found) :
                null;
        }
    }


    //  First World Implementation
    // -----------------------------

    class World {
        constructor(map, legend) {
            this.grid = new Grid( map[0].length, map.length );
            this.legend = legend;

            map.forEach((line, y) => {
                for (let x = 0; x < line.length; x++) {
                    this.grid.set(
                        new Vector(x, y),
                        elementFromChar( legend, line[x] )
                    );
                }
            });
        }

        toString() {
            let output = '';

            for (let y = 0; y < this.grid.height; y++) {
                for (let x = 0; x < this.grid.width; x++) {
                    output += charFromElement( this.grid.get(new Vector(x, y)) );
                }

                output += '\n';
            }

            return output;
        }

        checkDestination(action, vector) {
            if ( DIRECTIONS.has( action.direction ) ) {
                let dest = vector.plus( DIRECTIONS.get(action.direction) );

                if (this.grid.isInside(dest)) return dest;
            }
        }

        letAct(critter, vector) {
            let action = critter.act(new View(this, vector));

            if (action && action.type == "move") {
                let dest = this.checkDestination(action, vector);

                if (dest && this.grid.get(dest) == null) {
                    this.grid.set(vector, null);
                    this.grid.set(dest, critter);
                }
            }
        }

        turn() {
            let acted = [];

            this.grid.forEach((critter, vector) => {
                if (critter.act && acted.indexOf(critter) == -1) {
                    acted.push(critter);
                    this.letAct(critter, vector);
                }
            });
        }
    }

    class BouncingCritter {
        constructor() {
            this.direction = randomElement(DIRECTION_NAMES);
        }

        act(view) {
            if (view.look(this.direction) != " ")
                this.direction = view.find(" ") || "s";
            return {type: "move", direction: this.direction};
        }
    }

    const dirPlus = (dir, n) => {
        return DIRECTION_NAMES[ (DIRECTION_NAMES.indexOf(dir) + n + 8) % 8 ];
    };

    class WallFollower {
        constructor() {
            this.dir = "s";
        }

        act(view) {
            let start = this.dir;

            if (view.look( dirPlus(this.dir, -3) ) != " ") {
                start = this.dir = dirPlus(this.dir, -2);
            }

            while (view.look(this.dir) != " ") {
                this.dir = dirPlus(this.dir, 1);

                if (this.dir == start) break;
            }

            return { type: "move", direction: this.dir };
        }
    }

    class Wall { }


    //  Second World Implementation
    // ------------------------------

    const ACTION_TYPES = new Map([
        [
            'grow', critter => {
                critter.energy += 0.5;
                return true;
            }
        ],

        [
            'move', (critter, vector, action) => {
                let dest = this.checkDestination(action, vector);

                if (
                    dest == null ||
                    critter.energy <= 1 ||
                    this.grid.get(dest) != null

                ) return false;

                critter.energy -= 1;
                this.grid.set(vector, null);
                this.grid.set(dest, critter);

                return true;
            }
        ],

        [
            'eat', (critter, vector, action) => {
                let dest = this.checkDestination(action, vector);
                let atDest = dest != null && this.grid.get(dest);
            
                if (!atDest || atDest.energy == null) return false;
            
                critter.energy += atDest.energy;
                this.grid.set(dest, null);
                
                return true;
            }
        ],

        [
            'reproduce', (critter, vector, action) => {
                let baby = elementFromChar(this.legend, critter.originChar);
                let dest = this.checkDestination(action, vector);
            
                if (
                    dest == null ||
                    critter.energy <= 2 * baby.energy ||
                    this.grid.get(dest) != null
                ) return false;
            
                critter.energy -= 2 * baby.energy;
                this.grid.set(dest, baby);
                return true;
            }
        ],
    ]);

    class LifelikeWorld extends World {
        letAct(critter, vector) {
            let action = critter.act(new View(this, vector));

            let handled = action &&
                ACTION_TYPES.has(action.type) &&
                ACTION_TYPES.get(action.type).call(this, critter, vector, action);

            if (!handled) {
                critter.energy -= 0.2;

                if (critter.energy <= 0) this.grid.set(vector, null);
            }
        }
    }

    class Plant {
        constructor() {
            this.energy = 3 + Math.random() * 4;
        }

        act(view) {
            if (this.energy > 15) {
                let space = view.find(" ");

                if (space) return {
                    type: "reproduce",
                    direction: space
                };
            }

            if (this.energy < 20) return { type: "grow" };
        }
    }

    class PlantEater {
        constructor() {
            this.energy = 20;
        }

        act(view) {
            let space = view.find(" ");

            if (this.energy > 60 && space) return {
                type: "reproduce",
                direction: space
            };

            let plant = view.find("*");

            if (plant) return {
                type: "eat",
                direction: plant
            };

            if (space) return {
                type: "move",
                direction: space
            };
        }
    }

}());
