import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Router } from '@angular/router';  
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule,FormsModule] 
})
export class AuthorsComponent implements OnInit {
  authors: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];
  filteredAuthors: any[] = []; 
  searchText: string = '';

  constructor(private authorService: AuthorService,private router: Router) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe(
      (response) => {
        console.log('Authors fetched:', response);
        this.authors = response.data;
      },
      (error) => {
        console.error('Error fetching authors:', error);
      }
    );
  }

  deleteAuthor(id: number) {
    if (confirm('Are you sure you want to delete this author?')) {
      this.authorService.deleteAuthor(id).subscribe(() => {
        this.authors = this.authors.filter(author => author.id !== id);
      });
    }
  }

  editAuthor(authorId: number) {
    console.log("Navigating to Edit Author Page with ID:", authorId); 
    this.router.navigate(['/edit-author', authorId]);  
  }

  filterAuthors(): void {
    const search = this.searchText?.trim().toLowerCase(); 
  
    if (!search || search.length === 0) {
      this.filteredAuthors = []; 
      return;
    }
  
    
    this.filteredAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(search)
    );
  }
  
  
  
}
