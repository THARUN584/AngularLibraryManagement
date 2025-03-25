import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorService } from '../services/author.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ],
})

export class EditAuthorComponent implements OnInit {
  authorForm: FormGroup;
  authorId!: number; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
    private fb: FormBuilder
  ) {
    this.authorForm = this.fb.group({
      name: [''],
      place: [''], 
    });
  }

  ngOnInit(): void {

    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.authorId)) {
      console.error('Invalid author ID');
      this.router.navigate(['/authors']);
      return;
    }


    this.authorService.getAuthorById(this.authorId).subscribe(
      (response) => {
        if (response && response.data) {
          this.authorForm.patchValue({
            name: response.data.name,
            place: response.data.place, 
          });
        }
      },
      (error) => {
        console.error('Error fetching author:', error);
      }
    );
  }


  updateAuthor() {
    this.authorService.updateAuthor(this.authorId, this.authorForm.value).subscribe(
      () => {
        alert('Author updated successfully!');
        this.router.navigate(['/authors']);
      },
      (error) => {
        console.error('Error updating author:', error);
      }
    );
  }
}
