
/*!
 *  Eloquent Javascript Exercises, Chapter 2 - Chess Board
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
   *  @returns {String} - String that represents the grid;
   */
  function createChessBoard(size) {
    var str = '';

    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        str += i % 2 == j % 2 ? '#' : ' ';
      }

      str += '\n';
    }

    return str;
  }

  console.log( createChessBoard(8) );
}());
