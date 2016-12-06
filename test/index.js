'use strict';

/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

// core
const path = require('path');

// 3rd party
const _ = require('lodash');
const assert = require('chai').assert;
const figures = require('figures');

// lib
const codeframe = require('../lib/index.js');


/* -----------------------------------------------------------------------------
 * test
 * ---------------------------------------------------------------------------*/

describe('codeframe', function () {

	it('Should return cropped codeframe', function () {
		const contents = codeframe.get({
			file: 'test/fixtures/src.js',
			line: 10
		});

		assert.equal(contents.split('\n').length, 5);
	});

	it('Should allow modifying context count', function () {
		const contents = codeframe.get({
			file: 'test/fixtures/src.js',
			line: 10
		}, {
			context: 1
		});

		assert.equal(contents.split('\n').length, 3);
	});

	it('Should trim empty lines', function () {
		const contents = codeframe.get({
			file: 'test/fixtures/src.js',
			line: 17
		}, {
			context: 3
		});

		assert.equal(contents.split('\n').length, 3);
	});

	it('Should add line numbers', function () {
		const contents = codeframe.get({
			file: 'test/fixtures/src.js',
			line: 9
		}, {
			context: 1
		});

		const lines = contents.split('\n');
		assert.isTrue(lines[0].startsWith('    8 |'));
		assert.isTrue(lines[1].startsWith(`\u001b[41m\u001b[37m ${figures.pointer}  9 \u001b[39m\u001b[49m|`));
		assert.isTrue(lines[2].startsWith('   10 |'));
	});

	it('Should mark error character', function () {
		const contents = codeframe.get({
			file: 'test/fixtures/src.js',
			line: 9,
			column: 8
		});

		const lines = contents.split('\n');
		assert.isTrue(lines[2].includes('\u001b[7mb\u001b[27m'));
	});

	it('Should syntax highlight js src code', function () {
		const contents = codeframe.get({
			file: 'test/fixtures/src.js',
			line: 10
		});

		const lines = contents.split('\n');
		assert.isTrue(lines[0].includes('\u001b[36mconst\u001b[39m a \u001b[90m=\u001b[39m \u001b[35m1\u001b[39m\u001b[90m;\u001b[39m'));
	});

	it('Should return null if file does not exist', function () {
		const contents = codeframe.get({
			file: 'test/fixtures/none.js',
			line: 10
		});

		assert.isNull(contents)
	});

});
