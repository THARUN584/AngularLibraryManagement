// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthorsComponent } from './components/authors/authors.component';
// import { BooksComponent } from './components/books/books.component';
// import { HomeComponent } from './components/home/home.component';
// import { AddAuthorComponent } from './components/add-author/add-author.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { EditAuthorComponent } from './edit-author/edit-author.component';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common'; 
// import { EditBookComponent } from './edit-book/edit-book.component';
// const routes: Routes = [

//   { path: 'authors', component: AuthorsComponent },
//   { path: 'books', component: BooksComponent },
//   { path: 'add-author', component: AddAuthorComponent },
//   { path: '', redirectTo: '/authors', pathMatch: 'full' }  ,
//   { path: 'edit-author/:id', component: EditAuthorComponent },
//   { path: 'edit-book/:id', component: EditBookComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes),CommonModule,MatButtonModule,MatTableModule],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { HomeComponent } from './components/home/home.component';
import { AddAuthorComponent } from './components/add-author/add-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' }, // ✅ Redirect to books instead of authors
  { path: 'authors', component: AuthorsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'add-author', component: AddAuthorComponent },
  { path: 'edit-author/:id', component: EditAuthorComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: '**', redirectTo: '' }
   // ✅ Wildcard route to prevent unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // ✅ Removed unnecessary imports
  exports: [RouterModule]
})
export class AppRoutingModule { }
