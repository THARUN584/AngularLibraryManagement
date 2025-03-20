import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  standalone:true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSelectModule]
})
export class EditBookComponent implements OnInit {
  bookForm!: FormGroup;
  bookId!: number;
  authors: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.bookId) {
      console.error("Invalid Book ID");
      this.router.navigate(['/books']);
      return;
    }

    // Initialize Form
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      genere: ['', Validators.required],
      authorId: ['', Validators.required]
    });

    // Load Book Data
    this.bookService.getBookById(this.bookId).subscribe((response) => {
      if (response && response.data) {
        this.bookForm.patchValue({
          name: response.data.name,
          genere: response.data.genere,
          authorId: response.data.author?.id
        });
      }
    });

    // Load Authors for Dropdown
    this.bookService.getAuthors().subscribe((response) => {
      if (response && response.data) {
        this.authors = response.data;
      }
    });
  }

  updateBook() {
    if (this.bookForm.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    const updatedBook = {
      id: this.bookId,
      name: this.bookForm.value.name,
      genere: this.bookForm.value.genere,
      author: { id: this.bookForm.value.authorId }
    };

    this.bookService.updateBook(this.bookId, updatedBook).subscribe(() => {
      alert('Book updated successfully!');
      this.router.navigate(['/books']);
    });
  }
}
