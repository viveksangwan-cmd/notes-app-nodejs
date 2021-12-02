import chalk from "chalk";
import { argv } from "process";
import yargs from "yargs";
import { addNote, listNodes, readNote, removeNote } from "./notes.js";
const yarg = yargs();

yarg.version("1.1.0");

// Add command
yarg.command({
  command: "add",
  describe: "Add a new note.",
  builder: {
    title: {
      describe: "Note a title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body of note",
      demandOption: true,
      type: "string",
    },
  },
  handler() {
    addNote(yarg.argv.title, yarg.argv.body);
  },
});

// Remove command
yarg.command({
  command: "remove",
  describe: "Remove a note.",
  builder: {
    title: {
      decribe: "Note title to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler() {
    removeNote(yarg.argv.title);
  },
});

// List command
yarg.command({
  command: "list",
  describe: "List a notes.",
  handler() {
    listNodes();
  },
});

// Read command
yarg.command({
  command: "read",
  describe: "Read a note.",
  handler() {
    readNote(yarg.argv.title);
  },
});

yarg.parse(process.argv.slice(2));
