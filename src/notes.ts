// Standard deno modules
import { readJsonSync, writeJsonSync } from 'https://deno.land/std/fs/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';

// Thirty party modules
import iro, {
  bold,
  yellow,
  inverse,
  green,
  red,
  bgGreen,
} from 'https://deno.land/x/iro/src/iro.ts';

const currentDir = Deno.cwd();
const notesFilePath = path.resolve(`${currentDir}/data/notes-data.json`);

interface INote {
  title: string;
  body: string;
}

export function fetchNotes() {
  try {
    const notesParsed: any = readJsonSync(notesFilePath);
    return notesParsed;
  } catch (error) {
    console.error(error);
    return [];
  }
}
export function listNotes() {
  const notesList: INote[] = fetchNotes();

  console.log(iro(' Your notes ', inverse));
  for (const note of notesList) {
    console.log(' - ', note.title);
    console.log('●'.padStart(5), note.body);
  }
}
export function saveNotes(notes: INote[]) {
  writeJsonSync(notesFilePath, notes, { spaces: 2 });
}
export function createNote({ title, body }: INote) {
  const notesList = fetchNotes();
  const isDuplicate = notesList.find((note: INote) => note.title === title);
  if (!isDuplicate) {
    notesList.push({ title, body });
    saveNotes(notesList);

    console.log(iro('New note added!', bgGreen));
  } else {
    console.log(iro('Note title already taken!', inverse, red));
  }
}
export function readNote(title = 'Untitled') {
  const notesList = fetchNotes();
  const searchedNote = notesList.find((note: INote) => note.title === title);
  if (searchedNote) {
    console.log(iro(searchedNote.title, inverse));
    console.log(searchedNote.body);
  } else {
    console.log(iro('Note not found!', bold, inverse, red));
  }
}
export function removeNote(title: string) {
  const notesList = fetchNotes();
  const notesToKeep = notesList.filter(
    (note: INote) => note.title.toLowerCase() !== title.toLowerCase()
  );
  if (notesList.length > notesToKeep.length) {
    saveNotes(notesToKeep);

    console.log(iro('Note removed!', bgGreen));
  } else {
    console.log(iro('No note found!', inverse, yellow));
  }
}

export function updateNote(title: string, newBody: string, newTitle: string) {
  const notesList = fetchNotes();
  const currentNote = notesList.find(
    (note: INote) => note.title.toLowerCase() === title.toLowerCase()
  );
  const newNote = { title: newTitle, body: newBody };
  if (currentNote) {
    notesList.splice(notesList.indexOf(currentNote), 1, newNote);
    saveNotes(notesList);

    console.log(iro('Note updated!', bgGreen));
  } else {
    console.log(iro('This note does not exists', inverse, yellow));
  }
}
