// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {


      /*
      [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]

      If Queen is on (1,0)
      Any elements with (1,1), (1,2), (1,3) will be attacked
      */

      // Loop over the array at row index
      // Check if there are multiple values in the rowIndex
      // If there is return true
      // Otherwise return false


      // make a piece counter variable
      // iterate through the row array
      // if a spot in the row has a 1
      // increment piece counter

      // if piece counter is greater than 1
      // there is a conflict in the row (return true)
      // else
      // there is no conflict (return false)
      // var row = this.rows()[rowIndex];
      // var row = this.get.row(rowIndex);

      // THIS WORKS DONT CHANGE IT
      // console.log(this.get(rowIndex);

      var row = this.get(rowIndex);
      // console.log(rowIndex);
      var counter = 0;

      for (var i = 0; i < row.length; i++) {
        // console.log(row[i]);
        if (row[i] === 1) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }

      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {


      // var theBoard = this.get.row;
      // console.log('this is this.rows', this.rows());
      // console.log('this is the board', this.rows);

      var result = [];
      var theBoard = this.rows();

      for (var i = 0; i < theBoard.length; i++) {
        result.push(this.hasRowConflictAt(i));

      }


      for (var i = 0; i < result.length; i++) {
        if (result[i] === true) {
          return true;
        }
      }
      return false;

    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // column index is a number
      // get whole board
      // board[0][0]
      // board[1][columnIndex]

      var theBoard = this.rows();
      var counter = 0;

      for (var i = 0; i < theBoard.length; i++) {
        // if theboard[i][0] is a 1
        if (theBoard[i][colIndex] === 1) {
          counter++;
        }
        // add to the counter
      }
      return counter > 1;

      /*
    [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]

    if Queen is on (0,0)
    Any elements with (0,1) (0,2) or (0,3) will be attacked

      */

      // Loop over the array of arrays at a colIndex
      // check if there are any values in the colIndex for each of the arrays of arrays
      // if there is return true
      // Otherwise return false


    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //

      var theBoard = this.rows();
      // get the length value of a row

      // If the length was not just 4
      // var numOfColumns = this.get(0).length;
      var result = [];

      var counter = 0;
      while (counter < 4) {
        result.push(this.hasColConflictAt(counter));
        counter++;
      }

      for (var i = 0; i < result.length; i++) {
        if (result[i] === true) {
          return true;
        }
      }
      return false;

      // we call the helper function once for each column in the board
      // save the resutlt in an array


      // if therse a true in the array, we have a conflict - return true


      // Use Function above to check each column
      // If it is true return true
      // Otherwise return false
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme

      /*
    [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
      */


      // if array of arrays [i][i] has a value
      // array array of [i + 1][i + 1] has a value
      // array array of [i + 2][i + 2] has a value
      // array array of [i + 3][i + 3] has a value
      // return true
      // return false

      // if array of arrays[i]
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme

      /*
    [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ]
      */

      // Use the function to call the above function on the other arrays


    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme

      /*
    [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]
      */

    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
      /*
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ]
      */

    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
