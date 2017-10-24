
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
 *  You can get the Nth character, or letter, from a string by writing "string".charAt(N), similar
 *  to how you get its length with "s".length. The returned value will be a string containing only
 *  one character (for example, "b"). The first character has position zero, which causes the last
 *  one to be found at position string.length - 1. In other words, a two-character string has length 2,
 *  and its characters have positions 0 and 1.
 *
 *  Write a function countBs that takes a string as its only argument and returns a number that indicates
 *  how many uppercase “B” characters are in the string.
 *
 *  Next, write a function called countChar that behaves like countBs, except it takes a second argument
 *  that indicates the character that is to be counted (rather than counting only uppercase “B” characters).
 *  Rewrite countBs to make use of this new function.
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
 *  Write a range function that takes two arguments, start and end, and returns an array containing all
 *  the numbers from start up to (and including) end.
 *
 *  Next, write a sum function that takes an array of numbers and returns the sum of these numbers.
 *  Run the previous program and see whether it does indeed return 55.
 *
 *  As a bonus assignment, modify your range function to take an optional third argument that indicates the
 *  “step” value used to build up the array. If no step is given, the array elements go up by increments of one,
 *  corresponding to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure
 *  it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].
 */
(function() {
  "use strict";

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
