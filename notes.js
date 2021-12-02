import fs from "fs";
import chalk from "chalk";
import { get } from "https";

const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync("notes.json");
    const dataJSON = bufferData.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (data) => {
  try {
    const dataJSON = JSON.stringify(data);
    fs.writeFileSync("notes.json", dataJSON);
  } catch {
    return;
  }
};

export const listNodes = () => {
  const notes = loadNotes();
  console.log(chalk.green.bold("Your notes :"));
  notes.forEach((note) => {
    console.log(note.title);
  });
};

export const readNote = (title) => {
  const notes = loadNotes();
  const getNote = notes.filter((note) => {
    return note.title === title;
  });
  if (getNote.length === 1) {
    console.log(chalk.green.bold("Your Note :"));
    console.log(chalk.inverse(getNote[0].title));
    console.log(getNote[0].body);
  } else {
    console.log(chalk.red.bold("No note found."));
  }
};

export const removeNote = (title) => {
  const notes = loadNotes();
  const notesNotToDelete = notes.filter((note) => {
    return note.title !== title;
  });
  if (notes.length === notesNotToDelete.length) {
    console.log(chalk.red.bold("No note found"));
  } else {
    console.log(chalk.green.bold("Note removed"));
  }
  saveNotes(notesNotToDelete);
};

export const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicates = notes.filter((note) => {
    return note.title === title;
  });

  if (duplicates.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.bold("Note Added"));
  } else {
    console.log(chalk.red.bold("Duplicate Entry"));
  }
};
