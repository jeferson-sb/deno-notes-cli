// Thirty party modules
import Denomander from 'https://deno.land/x/denomander/mod.ts';

// Local imports
import * as notes from './notes.ts';

const program = new Denomander({
  app_name: 'Notes App',
  app_description: 'Create notes in json format from the command line',
  app_version: '1.0.0',
});

// Add command
program
  .command('add [title:body]')
  .description('Add a new note')
  .action((note: string) => {
    const [title, body] = note.split(':');
    notes.createNote({ title, body });
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
  .action((title: string) => {
    notes.readNote(title);
  });

// Update command
program
  .command('update [title:newTitle:newBody]')
  .description('Update a note')
  .action((note: string) => {
    const [title, newTitle, newBody] = note.split(':');
    notes.updateNote(title, newBody, newTitle);
  });

// Remove command
program
  .command('remove [title]')
  .description('Remove a note')
  .action((title: string) => {
    notes.removeNote(title);
  });

program.parse(Deno.args);
