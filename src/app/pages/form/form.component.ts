import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  backPage: string;
  noteId: number | undefined;
  note: Note;
  color: string;
  size: string;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.backPage = localStorage.getItem('page')!;
    this.noteId = this.route.snapshot.paramMap.get('id')
      ? parseInt(this.route.snapshot.paramMap.get('id')!)
      : undefined;
    this.note = {
      id: this.noteId ? this.noteId : this.noteService.getNotes().length + 1,
      title: this.noteId ? this.noteService.getNote(this.noteId).title : '',
      content: this.noteId ? this.noteService.getNote(this.noteId).content : '',
      duration: this.noteId
        ? this.noteService.getNote(this.noteId).duration
        : 0,
    };
    this.color = '#000001';
    this.size = '16';
  }

  changeColor(newColor: string): void {
    this.color = newColor;
  }

  changeSize(newSize: string): void {
    this.size = newSize;
  }

  getSelection() {
    const txtArea: HTMLTextAreaElement = document.querySelector('#content')!;
    const startIndex: number = txtArea.selectionStart;
    const endIndex: number = txtArea.selectionEnd + 1;
    const selection: string = window.getSelection()?.toString()!;

    return {
      start: startIndex,
      end: endIndex,
      selection: selection,
    };
  }

  insertNewLine(event: any): void {
    const indexes = [
      ...this.note.content.matchAll(new RegExp('<br>\n', 'g')),
    ].map((x) => x.index);

    const contentArray: Array<string> = this.note.content
      .split('')
      .filter((prev, index) => prev !== '\n' || indexes.includes(index - 4));

    if (event.key === 'Enter') {
      contentArray.splice(this.getSelection().start, 0, '<br>\n');

      this.note.content = contentArray.join('');

      this.setNewPosition(this.getSelection().start);
    }
  }

  addTags(tag: string, style?: string, colorStyle?: boolean): void {
    const contentArray: Array<string> = this.note.content.split('');
    const inlineStyle: string | undefined =
      style &&
      ` style='${style}:${
        style === 'text-shadow'
          ? '0 0 5px ' + this.color
          : colorStyle
          ? this.color
          : this.size + 'px'
      }'`;

    contentArray.splice(
      this.getSelection().start,
      0,
      `<${inlineStyle ? tag + inlineStyle : tag}>`
    );

    contentArray.splice(this.getSelection().end, 0, `</${tag}>`);

    this.note.content = contentArray.join('');

    localStorage.setItem('currentSelection', this.getSelection().selection);

    let styleLength: number = 0;

    switch (style) {
      case 'color':
        styleLength = 22;
        break;
      case 'background-color':
        styleLength = 33;
        break;
      case 'text-shadow':
        styleLength = 36;
        break;
      case 'font-size':
        styleLength = 23;
        break;
    }

    this.setNewPosition(0, tag.length + styleLength);
  }

  addList(type: string): void {
    const contentArray: Array<string> = this.note.content.split('');

    contentArray.splice(
      this.getSelection().start,
      0,
      `<${type}>
    <li>`
    );
    contentArray.splice(
      this.getSelection().end,
      0,
      `</li>
    <li>Segundo elemento de la lista</li>
    <li>Tercer elemento</li>
    <li>Cuarto elemento</li>
</${type}>`
    );

    this.note.content = contentArray.join('');

    this.setNewPosition(0, 11);
  }

  setNewPosition(newLine?: number, tagLength?: number): void {
    const txtArea: HTMLTextAreaElement = document.querySelector('#content')!;

    const newPosition: number = newLine
      ? newLine + 5
      : this.getSelection().selection
      ? this.note.content.indexOf(this.getSelection().selection) +
        this.getSelection().selection.length
      : this.getSelection().start + tagLength! + 2;

    setTimeout(() => {
      txtArea.selectionStart = newPosition;
      txtArea.selectionEnd = newPosition;

      txtArea.focus();

      this.color = '#000001';
    }, 50);
  }

  save(): void {
    this.noteService.addNote(this.note);

    const page: string = localStorage.getItem('page')!;

    this.router.navigateByUrl(`/home;page=${page}`);
  }

  edit(): void {
    this.noteService.updateNote(this.note);

    const page: string = localStorage.getItem('page')!;

    this.router.navigateByUrl(`/home;page=${page}`);
  }
}
