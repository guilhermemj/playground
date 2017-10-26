
/*!
 *  Eloquent Javascript Exercises, Chapter 2 - Chess Board Generator
 *
 *  Write a program that creates a string that represents an 8×8 grid, using
 *  newline characters to separate lines. At each position of the grid there is
 *  either a space or a “#” character. The characters should form a chess board.
 *
 *  When you have a program that generates this pattern, define a variable
 *  size = 8 and change the program so that it works for any size, outputting
 *  a grid of the given width and height.
 */
(function() {
  'use strict';

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


/**
 *  Eloquent Javascript Exercises, Chapter 3 - Recursive Evenness
 * 
 *  We’ve seen that % (the remainder operator) can be used to test whether a
 *  number is even or odd by using % 2 to check whether it’s divisible by two.
 *
 *  Here’s another way to define whether a positive whole number is even or odd:
 *
 *    - Zero is even.
 *    - One is odd.
 *    - For any other number N, its evenness is the same as N - 2.
 *
 *  Define a recursive function isEven corresponding to this description.
 *  The function should accept a number parameter and return a Boolean.
 *
 *  Test it on 50 and 75. See how it behaves on -1. Why? Can you think of a way to fix this?
 */
(function() {
  "use strict";

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

}());


/**
 *  Eloquent Javascript Exercises, Chapter 3 - Bean Counting
 *
 *  You can get the Nth character, or letter, from a string by writing "string".charAt(N),
 *  similar to how you get its length with "s".length. The returned value will be a string
 *  containing only one character (for example, "b"). The first character has position zero,
 *  which causes the last one to be found at position string.length - 1. In other words, a
 *  two-character string has length 2, and its characters have positions 0 and 1.
 *
 *  Write a function countBs that takes a string as its only argument and returns a number that
 *  indicates how many uppercase “B” characters are in the string.
 *
 *  Next, write a function called countChar that behaves like countBs, except it takes a second
 *  argument that indicates the character that is to be counted (rather than counting only uppercase
 *  “B” characters). Rewrite countBs to make use of this new function.
 */
(function() {
  "use strict";
  
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
   *  @param {String} str   - 'Haystack' string.
   *  @param {String} char  - Char to be count.
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
   *  @param {String} str   - 'Haystack' string.
   *  @param {String} char  - Char to be count.
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
   *  @param {String} str   - 'Haystack' string.
   *  @param {String} char  - Char to be count.
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


/**
 *  Eloquent Javascript Exercises, Chapter 4 - The sum of a range
 *
 *  Write a range function that takes two arguments, start and end, and returns an array containing
 *  all the numbers from start up to (and including) end.
 *
 *  Next, write a sum function that takes an array of numbers and returns the sum of these numbers.
 *  Run the previous program and see whether it does indeed return 55.
 *
 *  As a bonus assignment, modify your range function to take an optional third argument that indicates
 *  the “step” value used to build up the array. If no step is given, the array elements go up by
 *  increments of one, corresponding to the old behavior. The function call range(1, 10, 2) should
 *  return [1, 3, 5, 7, 9]. Make sure it also works with negative step values so that range(5, 2, -1)
 *  produces [5, 4, 3, 2].
 */
(function() {

  /**
   *  Create an array with numbers of given range.
   *
   *  @param {Number} start       - Start of range.
   *  @param {Number} end         - End of range.
   *  @param {Number} [step = 1]  - Step of increment.
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
   *  @param {Number[]} numberArr - Array of numbers to be sum.
   *
   *  @returns {Number} - Sum of numbers.
   */
  const sum = numberArr => numberArr.reduce( (a, b) => a + b );
}());


/**
 *  Eloquent Javascript Exercises, Chapter 4 - Reversing an array
 *
 *  Arrays have a method reverse, which changes the array by inverting the order in which its elements
 *  appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first,
 *  reverseArray, takes an array as argument and produces a new array that has the same elements in the
 *  inverse order. The second, reverseArrayInPlace, does what the reverse method does: it modifies the
 *  array given as argument in order to reverse its elements. Neither may use the standard reverse method.
 *
 *  Thinking back to the notes about side effects and pure functions in the previous chapter, which variant
 *  do you expect to be useful in more situations? Which one is more efficient?
 */
(function() {
  
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
    for (let i = 0, end = arr.length - 1, mid = Math.floor( end / 2 ), aux; i < mid; i++ ) {
      aux = arr[i];
      arr[i] = arr[ end - i ];
      arr[ end - i ] = aux;
    }
  };
}());


/**
 *  Eloquent Javascript Exercises, Chapter 4 - A list
 *
 *  Objects, as generic blobs of values, can be used to build all sorts of data structures. A common data
 *  structure is the list (not to be confused with the array). A list is a nested set of objects, with the
 *  first object holding a reference to the second, the second to the third, and so on.
 *
 *  A nice thing about lists is that they can share parts of their structure. For example, if I create two
 *  new values {value: 0, rest: list} and {value: -1, rest: list} (with list referring to the variable
 *  defined earlier), they are both independent lists, but they share the structure that makes up their
 *  last three elements. In addition, the original list is also still a valid three-element list.
 *
 *  Write a function arrayToList that builds up a data structure like the previous one when given [1, 2, 3]
 *  as argument, and write a listToArray function that produces an array from a list. Also write the helper
 *  functions prepend, which takes an element and a list and creates a new list that adds the element to
 *  the front of the input list, and nth, which takes a list and a number and returns the element at the
 *  given position in the list, or undefined when there is no such element.
 *
 *  If you haven’t already, also write a recursive version of nth.
 */
(function() {

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
  const prepend = (elem, list) => {
    return {
      value: elem,
      rest: list
    };
  };

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
   *    NOTE: Function declaration must be used to allow recurssion.
   *
   *  @param {Object} list  - Input list.
   *  @param {Number} index - Position of the desired item.
   *
   *  @returns {*} - Value of nth item in list.
   */
  function nth (list, index) {
    if (index === 0) return list.value;
    if (!list.rest || index < 0) return undefined;

    return nth(list.rest, index - 1);
  };
}());

/**
 *  The == operator compares objects by identity. But sometimes, you would prefer to compare the values of
 *  their actual properties.
 *
 *  Write a function, deepEqual, that takes two values and returns true only if they are the same value or
 *  are objects with the same properties whose values are also equal when compared with a recursive call to
 *  deepEqual.
 *  To find out whether to compare two things by identity (use the === operator for that) or by looking at
 *  their properties, you can use the typeof operator. If it produces "object" for both values, you should
 *  do a deep comparison. But you have to take one silly exception into account: by a historical accident,
 *  typeof null also produces "object".
 */
(function(){

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
