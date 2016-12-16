'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// core
const fs = require('fs')

// 3rd party
const _ = require('lodash')
const highlightEs = require('highlight-es')
const chalk = require('chalk')
const figures = require('figures')

// lib
const utils = require('./utils')

/* -----------------------------------------------------------------------------
 * Formatter
 * -------------------------------------------------------------------------- */

module.exports = class Formatter {

  get (entry, options = {}) {
    _.defaults(options, { context: 2 })

    try {
      const contents = fs.readFileSync(entry.file, { encoding: 'utf-8' })
      return this.style(contents, entry, options)
    } catch (e) {
      return null
    }
  }

  style (contents, entry, options) {
    const lines = this.highlight(contents, entry).split('\n')

    return this.crop(this.addLineNos(lines, entry),
      entry.line - 1, options.context).join('\n')
  }

  highlight (contents, entry) {
    const errMarker = '🤘😝🤘'
    const errIndex = utils.indexAt(contents, entry.line, entry.column)
    const errChar = contents[errIndex]

    return highlightEs(this.markError(contents, errIndex, errMarker))
      .replace(errMarker, chalk.inverse(errChar))
  }

  markError (str, index, marker) {
    return str.substr(0, index) + marker + str.substr(index + 1)
  }

  addLineNos (lines, entry) {
    const padLength = lines.length.toString().length

    return _.map(lines, (line, i) => {
      return this.addLineNo(_.padStart(i + 1, padLength), line, i === entry.line - 1)
    })
  }

  addLineNo (lineNo, line, isErrorLine) {
    return isErrorLine
      ? chalk.bgRed.white(` ${figures.pointer} ${lineNo} `) + `| ${line}`
      : `   ${lineNo} | ${line}`
  }

  crop (lines, errIndex, context) {
    const start = _.clamp(errIndex - context, 0, lines.length)
    const end = _.clamp(errIndex + context, 0, lines.length)

    return this.trim(lines.slice(start, end + 1))
  }

  trim (lines) {
    const firstLine = _.findIndex(lines, this.isNotEmptyLine)
    const lastLine = _.findLastIndex(lines, this.isNotEmptyLine)

    return lines.slice(firstLine, lastLine + 1)
  }

  isNotEmptyLine (line) {
    const cleaned = line.replace(/\s/g, '')
    return cleaned.indexOf('|') !== cleaned.length - 1
  }

}
