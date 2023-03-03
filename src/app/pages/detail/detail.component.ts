import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnDestroy {
  backPage: string;
  noteId: number;
  note: Note;
  durationFormat: string;
  durationData = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  };
  timer: NodeJS.Timer;
  timerActive: boolean;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.noteId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.note = this.noteService.getNote(this.noteId);
    this.durationFormat = new Date(this.note.duration * 1000)
      .toISOString()
      .slice(11, 19);
    this.durationData = {
      seconds: new Date(this.note.duration * 1000).getSeconds(),
      minutes: new Date(this.note.duration * 1000).getMinutes(),
      hours: new Date(this.note.duration * 1000).getHours() - 1,
    };
    this.backPage = localStorage.getItem('page')!;
  }

  increase(): void {
    this.durationFormat = new Date(this.note.duration * 1000)
      .toISOString()
      .slice(11, 19);

    this.note.duration++;
  }

  start(): void {
    this.timerActive = true;

    this.increase();

    this.timer = setInterval(() => this.increase(), 1000);
  }

  stop(): void {
    this.note.duration--;

    this.timerActive = false;

    clearInterval(this.timer);

    this.durationData = {
      seconds: new Date(this.note.duration * 1000).getSeconds(),
      minutes: new Date(this.note.duration * 1000).getMinutes(),
      hours: new Date(this.note.duration * 1000).getHours() - 1,
    };

    this.noteService.updateNote(this.note);
  }

  clear(): void {
    this.timerActive = false;

    clearInterval(this.timer);

    this.note.duration = 0;

    this.durationData = {
      seconds: 0,
      minutes: 0,
      hours: 0
    };

    this.durationFormat = new Date(this.note.duration * 1000)
      .toISOString()
      .slice(11, 19);

    this.noteService.updateNote(this.note);
  }

  deleteNote(id: number): void {
    this.timerActive && this.stop();

    this.noteService.deleteNote(id);

    const page: string = localStorage.getItem('page')!;

    this.router.navigateByUrl(`/home;page=${page}`);
  }

  ngOnDestroy(): void {
    this.timerActive && this.stop();
  }
}
