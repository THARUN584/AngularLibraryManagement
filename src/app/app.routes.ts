import { Routes } from '@angular/router';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { HomeComponent } from './components/home/home.component';
import { AddAuthorComponent } from './components/add-author/add-author.component'; // ✅ Ensure this component exists

import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';


// export const routes: Routes = [
//   { path: '', component: HomeComponent }, // Home Page
//   { path: 'authors', component: AuthorsComponent }, // List Authors Page
//   { path: 'add-author', component: AddAuthorComponent }, // Add Author Page
//   { path: 'books', component: BooksComponent },
//   { path: 'add-book', component: AddBookComponent }, // List Books Page
//   { path: 'edit-author/:id', component: EditAuthorComponent }, 
//   { path: '**', redirectTo: '' } ,// Redirect unknown routes to home
  
// ];

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'add-author', component: AddAuthorComponent },
  { path: 'books', component: BooksComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'edit-author/:id', component: EditAuthorComponent },

  { path: '**', redirectTo: '' }
 // ✅ Added this

];
