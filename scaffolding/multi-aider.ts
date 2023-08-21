import * as glob from 'glob'
import inquirer from 'inquirer'
import { exec } from 'child_process'
import fs from 'fs'
import chalk from 'chalk'

const argv = require('yargs/yargs')(process.argv.slice(2))
  .option('pattern', {
    alias: 'p',
    description: 'Glob pattern for input files',
    type: 'string',
    demandOption: true
  })
  .option('template', {
    alias: 't',
    description: 'Script template',
    type: 'string',
    demandOption: true
  })
  .option('extraFiles', {
    alias: 'e',
    description: 'Extra content files',
    type: 'array',
    default: []
  })
  .help()
  .alias('help', 'h').argv

const ignorePatterns = fs.existsSync('.multi-aider-ignore')
  ? fs.readFileSync('.multi-aider-ignore', 'utf-8').split('\n')
  : []

const files = glob.sync(argv.pattern, { ignore: ignorePatterns })
const commands = files.reduce((acc: string[], file) => {
  const specFile = file.replace('.ts', '.spec.ts')
  let command = argv.template
  if (fs.existsSync(specFile)) {
    command = command.replace('{s}', file).replace('{t}', specFile)
    acc.push(
      ['aider', `--msg="${command}"`, file, specFile, ...argv.extraFiles].join(
        '\\\n  '
      )
    )
  } else if (command.includes('{t}')) {
    console.warn(
      chalk.red(
        `Warning: Skipping command for ${file} as no corresponding spec file exists and the template uses {t}`
      )
    )
  } else {
    command = command.replace('{s}', file).replace('{t}', '')
    argv.extraFiles.forEach((extraFile: string) => {
      command = command.replace(`{${extraFile}}`, extraFile)
    })
    acc.push(['aider', `--msg="${command}"`, `${file}`].join('\n  '))
  }
  return acc
}, [])

console.log('The following commands will be run:')
console.log(commands.join('\n\n'))

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Do you want to proceed?',
      default: false
    }
  ])
  .then((answers) => {
    if (answers.proceed) {
      commands.forEach((command) => {
        exec(command.split('\n  ').join(' '), (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            return
          }
          console.log(`stdout: ${stdout}`)
          console.error(`stderr: ${stderr}`)
        })
      })
    }
  })
