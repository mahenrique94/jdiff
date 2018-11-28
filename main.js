const colors = require('colors')

const _ = require('lodash')
const diff = require('keys-diff')

const messages = require('./translate/en')

const { compose } = require('./utils/functions')
const { parseToJson, readFile } = require('./utils/json')

const FIRST_FILE = 0
const SECOND_FILE = 1
const TWO_FILES = 2

const jsonDiffs = []

process.argv.slice(2).forEach(arg => jsonDiffs.push(compose(arg, readFile, parseToJson)))

if (Array.isArray(jsonDiffs)) {
    if (jsonDiffs.length === TWO_FILES) {
        const firstJson = jsonDiffs[FIRST_FILE]
        const compareJson = jsonDiffs[SECOND_FILE]

        console.log(diff(firstJson, compareJson))
    } else {
        console.error(colors.red(messages.error.mustHaveTwoFiles))
    }
}
