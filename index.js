#!/usr/bin/env node
const parse = require('swagger-parse-flowtyped');
const api = require('./lib/codegen.js');
const cli = require('./lib/cli.js');
const fs = require('fs-extra');
const stdin = require('get-stdin');

require('yargs')
  .command('*', 'Generate', (yargs2) => {
  }, (argv) => {
      return stdin().then(str => JSON.parse(str)).then(str => {
          console.log(api(parse({
              swagger: str,
              moduleName: 'swagger',
              className: 'Swagger'
          })));
      });
  })
  .command('cli', 'Generate', (yargs2) => {
  }, (argv) => {
      return stdin().then(str => JSON.parse(str)).then(str => {
          console.log(cli(parse({
              swagger: str,
              moduleName: 'swagger',
              className: 'Swagger'
          })));
      });
  })
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .option('h', {
    alias: 'help',
    description: 'display help message'
  })
  .help('help')
  .fail((msg, err) => {
    console.error(msg);
    console.error(err);
  }).argv;
