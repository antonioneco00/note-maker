import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements AfterViewInit {
  @Input() id: number;
  @Input() title: string;
  @Input() content: string;

  @Output('deleteNote') deleteNote: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngAfterViewInit(): void {
    $('ul, ol').addClass('list-inside');
    $('ul').addClass('list-disc');
    $('ol').addClass('list-decimal');
  }
}
