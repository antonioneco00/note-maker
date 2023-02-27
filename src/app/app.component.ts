import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'note-maker';

  constructor(public router: Router) {}
}

/*
  Colores:
  #fefcbf
  #f6ad55
  #f6e05e
*/