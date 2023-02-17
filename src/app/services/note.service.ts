import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  allNotes: Array<Note>;

  constructor(private router: Router) {
    this.allNotes = localStorage.getItem('notes')
      ? JSON.parse(localStorage.getItem('notes')!)
      : [];
  }

  getNote(id: number): Note {
    const currentNote: Note | undefined = this.allNotes.find((note) => note.id === id);
    
    !currentNote && this.router.navigateByUrl('/home');
    
    return currentNote!;
  }

  getNotes(page?: number): Array<Note> {
    page = page! * 6;

    return page ? this.allNotes.slice(page - 6, page) : this.allNotes;
  }

  addNote(note: Note): void {
    this.allNotes.push(note);

    this.saveData(this.allNotes);
  }

  updateNote(note: Note): void {
    const editNote: Note = this.getNote(note.id);

    editNote.title = note.title;
    editNote.content = note.content;
    editNote.duration = note.duration;

    this.saveData(this.allNotes);
  }

  deleteNote(id: number): void {
    this.allNotes = this.allNotes.filter((note) => note.id !== id);

    this.saveData(this.allNotes);
  }

  saveData(data: Array<Note>): void {
    localStorage.setItem('notes', JSON.stringify(data));
  }
}
