#!usr/bin/env node
import { Command } from 'commander';
import * as packageJson from '../../package.json';

const program = new Command();

program.version(packageJson.version)
    