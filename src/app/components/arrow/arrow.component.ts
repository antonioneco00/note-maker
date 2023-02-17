import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css']
})
export class ArrowComponent implements OnChanges {
  @Input() left: boolean;
  @Input() page: number | null;
  @Input() fullPage: boolean;

  constructor (private noteService: NoteService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if ((this.page! > 1 && this.left) || (this.page! < Math.ceil(this.noteService.getNotes().length / 6) && !this.left) || this.fullPage) {
      this.page = this.left ? this.page! - 1 : this.page! + 1;
    } else {
      this.page = null;
    }
  }
}
