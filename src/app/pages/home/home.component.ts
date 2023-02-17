import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notesArray: Array<Note>;
  emptyNotes: number;
  page: number;
  fullPage: boolean;

  constructor(private noteService: NoteService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.page = params.get('page') ? parseInt(params.get('page')!) : 1;

      this.notesArray = this.noteService.getNotes(this.page);
      this.emptyNotes = 6 - this.notesArray.length;
      this.fullPage = this.notesArray.length && this.notesArray.length % 6 === 0 ? true : false;
      
      localStorage.setItem('page', `${this.page}`);
    });
  }

  ngOnInit(): void {
    this.notesArray.length === 0 && this.router.navigateByUrl('/home');
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id);
    this.notesArray = this.noteService.getNotes(this.page);
    this.emptyNotes = 6 - this.notesArray.length;
    this.fullPage = this.notesArray.length && this.notesArray.length % 6 === 0 ? true : false;
  }
}
