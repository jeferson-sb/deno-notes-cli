// Thirty party modules
import Denomander from 'https://deno.land/x/denomander/mod.ts';

// Local imports
import * as notes from './notes.ts';

const program = new Denomander({
  app_name: 'Notes App',
  app_description: 'Create notes in json format from the command line',
  app_version: '1.0.0',
});

interface INote {
  title: string;
  body: string;
  newTitle?: string;
  newBody?: string;
}

// Add command
program
  .command('add [title] [body]')
  .description('Add a new note')
  .action(({ title, body }: INote) => {
    const note = { title, body };
    notes.createNote(note);
  });

// List command
program
  .command('list')
  .description('List all notes')
  .action(() => {
    notes.listNotes();
  });

// Read command
program
  .command('read [title]')
  .description('Read a note')
  .action(({ title }: INote) => {
    notes.readNote(title);
  });

// Update command
program
  .command('update [title] [newTitle] [newBody]')
  .description('Update a note')
  .action(({ title, newTitle, newBody }: INote) => {
    notes.updateNote(title, String(newBody), String(newTitle));
  });

// Remove command
program
  .command('remove [title]')
  .description('Remove a note')
  .action(({ title }: INote) => {
    notes.removeNote(title);
  });

program.parse(Deno.args);
