import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../services/author.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule,ReactiveFormsModule]
})
export class AddAuthorComponent {
  authorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      place: ['',Validators.required]
    });
  }

  addAuthor() {
    const newAuthor = {
      name: this.authorForm.value.name,
      place: this.authorForm.value.place
    };

    this.authorService.addAuthor(newAuthor).subscribe(
      response => {
        alert("✅ Author added successfully!");
        this.router.navigate(['/authors']);
      },
      error => {
        console.error("❌ Error adding author:", error);
        alert("❌ Failed to add author.");
      }
    );
  }

}
