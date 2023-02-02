import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  review?: number;
  userInput: string = '';
  submitted: boolean = false;
  pending: boolean = true;
  output?: string;
  constructor() { }

  ngOnInit(): void {
  }

  assignReview(n: number): void {
    this.review = n;
  }

  onSubmit(): void {
    if (this.review) {
      this.submitted=true;
    }
  }
}
