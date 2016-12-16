'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
const Formatter = require('./formatter')

/* -----------------------------------------------------------------------------
 * codeframe
 * -------------------------------------------------------------------------- */

const formatter = new Formatter()

module.exports = {

  get (entry, options) {
    return formatter.get(entry, options)
  }

}
