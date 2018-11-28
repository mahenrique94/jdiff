#!/usr/bin/env node
const chalk = require('chalk')
const argv = require('yargs')
    .default({ files: [] })
    .alias('f', 'files')
    .alias('h', 'help')
    .usage('Usage: $0 -f [...files]')
    .describe('files', 'Two JSON file to do comparison')
    .example('$0 -f j1.json j2.json', 'To do a comparsion between two JSON files')
    .array('files')
    .demandOption(['files'])
    .help('h')
    .argv

const diff = require('keys-diff')

const messages = require('./translate/en')

const { compose } = require('./utils/functions')
const { parseToJson, readFile } = require('./utils/json')

const FIRST_FILE = 0
const SECOND_FILE = 1
const TWO_FILES = 2

const files = argv.files
const jsonDiffs = []

if (Array.isArray(files)) {
    if (files.length) {
        files.forEach(arg => jsonDiffs.push(compose(arg, readFile, parseToJson)))
        if (Array.isArray(jsonDiffs)) {
            if (jsonDiffs.length === TWO_FILES) {
                const firstJson = jsonDiffs[FIRST_FILE]
                const compareJson = jsonDiffs[SECOND_FILE]

                console.log(diff(firstJson, compareJson))
            } else {
                console.error(chalk.red(messages.error.mustHaveTwoFiles))
            }
        }
    }
}
