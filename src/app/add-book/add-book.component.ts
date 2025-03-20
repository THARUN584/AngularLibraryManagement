import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../services/book.service'
import { AuthorService } from '../services/author.service'
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  standalone: true,
      imports: [CommonModule, MatButtonModule, MatButtonModule, RouterModule,FormsModule,ReactiveFormsModule,MatInputModule,MatOptionModule,MatSelectModule]
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  authors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router 
  ) {}

  ngOnInit() {
 
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      genere: ['', Validators.required],
      authorId: ['', Validators.required]
    });

    this.authorService.getAuthors().subscribe((response: any) => {
      this.authors = response.data;  
    });
  }

  addBook() {
    if (this.bookForm.valid) {
      const bookData = {
        name: this.bookForm.value.name,
        genere: this.bookForm.value.genere,
        author: { id: this.bookForm.value.authorId } 
      };
  
      this.bookService.addBook(bookData).subscribe({
        next: () => {
          alert('Book added successfully!');
          this.router.navigate(['/books']); 
        },
        error: (error) => {
          console.error('Error adding book:', error);
          alert('Failed to add book. Please check the data.');
        }
      });
    }
  }
  
}