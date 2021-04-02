// Standard deno modules
import * as path from "https://deno.land/std/path/mod.ts";

// Thirty party modules
import iro, {
  bgGreen,
  bold,
  inverse,
  red,
  yellow,
} from "https://deno.land/x/iro/src/iro.ts";

const currentDir = Deno.cwd();
const notesFilePath = path.resolve(currentDir, "data", "notes-data.json");

interface Note {
  title: string;
  body: string;
}

export async function fetchNotes() {
  try {
    const file = await Deno.readTextFile(notesFilePath);
    const notes: Note[] = JSON.parse(file);
    return notes;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function listNotes() {
  const notesList: Note[] = await fetchNotes();

  console.log(iro(" Your notes ", inverse));
  for (const note of notesList) {
    console.log(" - ", note.title);
    console.log("●".padStart(5), note.body);
  }
}

export async function saveNotes(notes: Note[]) {
  try {
    await Deno.writeTextFile(notesFilePath, JSON.stringify(notes));
  } catch (error) {
    throw new Error(`Unable to write contents to file: ${error}`);
  }
}

export async function createNote({ title, body }: Note) {
  const notesList = await fetchNotes();
  const isDuplicate = notesList.find((note: Note) => note.title === title);
  if (!isDuplicate) {
    notesList.push({ title, body });
    await saveNotes(notesList);

    console.log(iro("New note added!", bold, bgGreen));
  } else {
    console.log(iro("Note title already taken!", inverse, red));
  }
}

export async function readNote(noteTitle: string) {
  const notesList = await fetchNotes();
  const searchedNote = notesList.find((note: Note) => {
    return note.title.toLocaleLowerCase() === noteTitle.toLocaleLowerCase();
  });

  if (searchedNote) {
    console.log(iro(searchedNote.title, inverse));
    console.log(searchedNote.body);
  } else {
    console.log(iro("Note not found!", bold, inverse, red));
  }
}

export async function removeNote(title: string) {
  const notesList = await fetchNotes();
  const notesToKeep = notesList.filter(
    (note: Note) => note.title.toLowerCase() !== title.toLowerCase(),
  );
  if (notesList.length > notesToKeep.length) {
    await saveNotes(notesToKeep);

    console.log(iro("Note removed!", bgGreen));
  } else {
    console.log(iro("No note found!", inverse, yellow));
  }
}

export async function updateNote(note: string, { title, body }: Partial<Note>) {
  const notesList = await fetchNotes();
  const currentNote = notesList.find(
    (n: Note) => n.title.toLowerCase() === note.toLowerCase(),
  );
  const newNote = { title, body } as Note;

  if (currentNote) {
    notesList.splice(notesList.indexOf(currentNote), 1, newNote);
    await saveNotes(notesList);

    console.log(iro("Note updated!", bgGreen));
  } else {
    console.log(iro("This note does not exists", inverse, yellow));
  }
}
