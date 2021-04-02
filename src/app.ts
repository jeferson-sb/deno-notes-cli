// Thirty party modules
import Denomander from 'https://deno.land/x/denomander/mod.ts';

// Local imports
import * as notes from './notes.ts';

const program = new Denomander({
  app_name: 'Deno Notes App',
  app_description: 'Create notes in json format from the command line',
  app_version: '1.1.0',
});

// Add command
program
  .command('add')
  .description('Add a new note')
  .action(() => {
    const title = prompt('Note title:') ?? 'Note three';
    const body = prompt('Note body:') ?? '';
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
  .command('read')
  .description('Read a note')
  .action(() => {
    const title = prompt('Note title: ') ?? 'Note one';
    notes.readNote(title);
  });

// Update command
program
  .command('update')
  .description('Update a note')
  .action(() => {
    const existingNote = prompt(
      'What note do you want to update? [title]'
    ) as string;
    const title = prompt('New title:') ?? 'Note one';
    const body = prompt('New body:') ?? '';
    notes.updateNote(existingNote, { title, body });
  });

// Remove command
program
  .command('remove')
  .description('Remove a note')
  .action(() => {
    const title = prompt('Note title:') ?? 'Note one';
    notes.removeNote(title);
  });

program.parse(Deno.args);
