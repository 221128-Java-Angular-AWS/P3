import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewInt?: number;
  userInput: string = '';
  submitted: boolean = false;
  pending: boolean = true;
  output?: string;
  @Input() user?: User;
  @Input() product?: Product;

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
  }

  assignReview(n: number): void {
    this.reviewInt = n;
  }

  onSubmit(): void {
    if (this.reviewInt) {
      this.submitted=true;
      let review = new Review(this.userInput, this.reviewInt, this.user, this.product);
      this.reviewService.postReview(review)
    }
  }
}
