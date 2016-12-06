'use strict';

/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

// 3rd party
const assert = require('chai').assert;

// lib
const utils = require('../lib/utils.js');


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('utils', function () {

	describe('indexAt', function () {

		before(function () {
			this.testStr = 'abcd\nef\nghij';
		});

		it('Should return the index at a given line/column.', function () {
			assert.equal(this.testStr[utils.indexAt(this.testStr, 2, 2)], 'f');
		});

		it('Should return the index at a given line.', function () {
			assert.equal(this.testStr[utils.indexAt(this.testStr, 2)], 'e');
		});

		it('Should return -1 if the line does not exist.', function () {
			assert.equal(utils.indexAt(this.testStr, 4, 1), -1);
		});

		it('Should return -1 if the column at the given line does not exist.', function () {
			assert.equal(utils.indexAt(this.testStr, 3, 5), -1);
		});

	});

});
