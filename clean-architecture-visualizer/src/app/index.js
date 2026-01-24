#!/usr/bin/env node
import { Command } from "commander";
import * as packageJson from "../../package.json" with { type: "json" };
import { sayHello } from "../test.js";
const program = new Command();
program
    .version(packageJson.default.version)
    .command("say-hello")
    .description("A simple CLI tool to say hello")
    .action(() => {
    sayHello();
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map