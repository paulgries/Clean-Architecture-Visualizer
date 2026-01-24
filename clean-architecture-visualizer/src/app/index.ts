#!/usr/bin/env npx tsx
import { Command } from "commander";
import * as packageJson from "../../package.json" with { type: "json" };
import { sayHello } from "../test.js";
import * as fs from "fs";
import * as path from "path";

const program = new Command();

program.version(packageJson.default.version);

program
  .command("say-hello")
  .description("A simple CLI tool to say hello")
  .action(() => {
    sayHello();
  });

program
  .command("read-java <filePath>")
  .description("Read and display the contents of a Java file")
  .action((filePath: string) => {
    try {
      const fullPath = path.resolve(filePath);
      const contents = fs.readFileSync(fullPath, "utf-8");
      console.log(contents);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error reading file: ${error.message}`);
      } else {
        console.error("An unknown error occurred");
      }
    }
  });

program.parse(process.argv);
