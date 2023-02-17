import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      $('#theme').attr('src', '../../../assets/images/moon.png');
    }
  }

  toggleDarkMode(): void {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
      $('#theme').attr('src', '../../../assets/images/sun.png');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      $('#theme').attr('src', '../../../assets/images/moon.png');
    }
  }
}
