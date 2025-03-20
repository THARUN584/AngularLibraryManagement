// import { Component, OnInit } from '@angular/core';
// import { BookService } from '../../services/book.service';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatFormField, MatInputModule } from '@angular/material/input';
// import { MatOptionModule } from '@angular/material/core';
// import { MatSelectModule } from '@angular/material/select';

// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-books',
//   templateUrl: './books.component.html',
//   styleUrls: ['./books.component.css'],
//    standalone: true,
//     imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule,FormsModule,ReactiveFormsModule,MatInputModule,MatOptionModule,MatSelectModule]
// })
// export class BooksComponent implements OnInit {
//   books: any[] = []; // Initialize as empty array
//   dataSource = new MatTableDataSource<any>(); // ✅ Use MatTableDataSource correctly
//   displayedColumns: string[] = ['id', 'name', 'genere', 'actions']; // ✅ Ensure columns match HTML

//   constructor(private bookService: BookService,private router:Router) {}

//   ngOnInit(): void {
//     this.loadBooks();
//   }

//   loadBooks() {
//     this.bookService.getBooks().subscribe(
//       (response) => {
//         console.log("✅ API Response:", response);
        
//         // Check if response contains "data"
//         if (response && response.data) {
//           this.books = response.data; // Assign books from API
//           this.dataSource.data = response.data; // Update MatTableDataSource
//         } else {
//           console.error("❌ Unexpected API Response:", response);
//         }
//       },
//       (error) => {
//         console.error("❌ Error fetching books:", error);
//       }
//     );
//   }


//   deleteBook(bookId: number): void {
//     if (confirm("Are you sure you want to delete this book?")) {
//       this.bookService.deleteBook(bookId).subscribe(
//         () => {
//           this.books = this.books.filter(book => book.id !== bookId); // ✅ Remove deleted book from UI
//           alert("✅ Book deleted successfully!");
//         },
//         (error) => {
//           console.error("❌ Error deleting book:", error);
//           alert("❌ Failed to delete book.");
//         }
//       );
//     }
//   }
//   editBook(bookId: number): void {
//     console.log("Navigating to Edit Book Page with ID:", bookId); // ✅ Debugging Log
//     this.router.navigate(['/edit-book', bookId]); // ✅ Correct navigation
//   }
  


// }
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

// ✅ Import required Angular modules
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  standalone: true,
  imports: [
    CommonModule,  
    MatTableModule, 
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ]
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'genere','actions'];
  filteredBooks: any[] = []; 
  searchText: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      (response) => {
        if (response && response.data) {
          this.books = response.data;
          this.dataSource.data = response.data;
        }
      },
      (error) => {
        console.error("Error fetching books:", error);
      }
    );
  }

 
  














  // loadBooks() {
  //   this.bookService.getBooks().subscribe(
  //     (response) => {
  //       console.log("✅ API Response:", response); // Debugging log
  
  //       if (response && response.data) {
  //         this.books = response.data.map((book: any) => ({
  //           ...book,
  //           author: book.author.name || { name: 'Unknown' } // Avoid null errors
  //         }));
  
  //         this.dataSource.data = this.books; // ✅ Update MatTableDataSource
  //       } else {
  //         console.error("❌ Unexpected API Response:", response);
  //       }
  //     },
  //     (error) => {
  //       console.error("❌ Error fetching books:", error);
  //     }
  //   );
  // }
  
  
  


  deleteBook(bookId: number): void {
    if (confirm("Are you sure you want to delete this book?")) {
      this.bookService.deleteBook(bookId).subscribe(
        () => {
          this.books = this.books.filter(book => book.id !== bookId);
          this.dataSource.data = this.books;
          alert("Book deleted successfully!");
        },
        (error) => {
          console.error("Error deleting book:", error);
          alert("Failed to delete book.");
        }
      );
    }
  }

  editBook(bookId: number): void {
    console.log("Navigating to Edit Book Page with ID:", bookId); // Debugging Log
    this.router.navigate([`/edit-book/${bookId}`]); // ✅ Ensure correct path
  }

  // goBack(): void {
  //   this.router.navigate(['/']); // ✅ Navigates back to home page
  // }


  filterBooks(): void {
    const search = this.searchText?.trim().toLowerCase(); // Ensure lowercase comparison
  
    if (!search || search.length === 0) {
      this.filteredBooks = []; // Clear the list when search is empty
      return;
    }
  
    // Filter only by author's name, not place
    this.filteredBooks = this.books.filter(book =>
      book.name.toLowerCase().includes(search)
    );
  }

}

