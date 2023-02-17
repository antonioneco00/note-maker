import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NoteComponent } from './components/note/note.component';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { ArrowComponent } from './components/arrow/arrow.component';
import { DetailComponent } from './pages/detail/detail.component';

import { FormsModule } from '@angular/forms';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NoteComponent,
    FormComponent,
    HomeComponent,
    ArrowComponent,
    NoSanitizePipe,
    DetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
