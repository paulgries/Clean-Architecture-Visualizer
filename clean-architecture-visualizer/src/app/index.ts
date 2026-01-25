#!/usr/bin/env npx tsx
import { Command } from "commander";
import * as packageJson from "../../package.json" with { type: "json" };
import { sayHello } from "../test.js";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { exec } from "child_process";
import type { bool } from "aws-sdk/clients/signer.js";

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
  .option("--html", "Output to an HTML file and open in browser")
  .action((filePath: string, options: { html?: boolean }) => {
    try {
      const fullPath = path.resolve(filePath);
      const contents = fs.readFileSync(fullPath, "utf-8");

      // Highlight Java function names: word followed by (
      const highlighted = contents.replace(
        /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
        (match, functionName) => {
          return `<span class="function">${functionName}</span>(`;
        },
      );

      if (options.html) {
        // Create HTML document
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${path.basename(filePath)}</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background-color: #1e1e1e;
      color: #d4d4d4;
      padding: 20px;
      line-height: 1.6;
    }
    pre {
      background-color: #252526;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    .function {
      color: #4ec9b0;
      font-weight: bold;
    }
    h1 {
      color: #569cd6;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <h1>${path.basename(filePath)}</h1>
  <pre>${highlighted}</pre>
</body>
</html>
        `;

        // Write to file
        const outputPath = path.join(
          path.dirname(fullPath),
          `${path.parse(filePath).name}.html`,
        );
        fs.writeFileSync(outputPath, htmlContent);

        // Open in browser
        const openCommand =
          process.platform === "darwin"
            ? "open"
            : process.platform === "win32"
              ? "start"
              : "xdg-open";
        exec(`${openCommand} "${outputPath}"`, (error) => {
          if (error) {
            console.error(`Error opening browser: ${error.message}`);
          } else {
            console.log(`HTML file created and opened: ${outputPath}`);
          }
        });
      } else {
        // Console output with chalk highlighting
        const consoleHighlighted = contents.replace(
          /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
          (match, functionName) => {
            return chalk.cyan(functionName) + "(";
          },
        );
        console.log(consoleHighlighted);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error reading file: ${error.message}`);
      } else {
        console.error("An unknown error occurred");
      }
    }
  });

program.parse(process.argv);
