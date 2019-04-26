#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import generateDifference from '..';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .action((firstConf, secondConf, { format }) => {
    console.log(generateDifference(firstConf, secondConf, format));
  })
  .parse(process.argv);

if (!program.args.length) program.help();
