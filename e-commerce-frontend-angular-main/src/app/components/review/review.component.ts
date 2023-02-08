import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ReviewService } from 'src/app/services/review.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewInt?: number;
  review?: Review;
  userInput: string = '';
  submitted: boolean = false;
  reviewed?: boolean | undefined;
  output?: string;
  ping?: string;
  user?: User;
  product?: Product;
  hasBeenReviewed?: Review[];
  custom: string = "This is output";

  constructor(private route: ActivatedRoute, private productService: ProductService, private reviewService: ReviewService, private profileService: ProfileService) { }

  ngOnInit(): void {
    
    this.profileService.getUser().subscribe( 
      (response) => 
        {
        this.user = response;
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getSingleProduct(id).subscribe(
          (product) =>
            {this.product = product;
            this.checkReviewed();
            });
        }
    );
  }
  

  assignReview(n: number): void {
    this.reviewInt = n;
  }

  onSubmit(): void {
    if (this.reviewInt) {
      this.submitted=true;
      let review = new Review(this.userInput, this.reviewInt, this.user, this.product);
      this.reviewService.postReview(review).subscribe((review) => {
        this.review = review;
      })
      this.checkReviewed();
    }
  }

  checkReviewed(): void{
    let booleanReview = false;
    if(this.product){
      this.reviewService.getReview(this.product?.id).subscribe((hasBeenReviewed: Review[]) => {
        this.hasBeenReviewed = hasBeenReviewed;
        if(this.hasBeenReviewed.length >0) 
          {
            booleanReview = true;
          }
          this.reviewed = booleanReview;
      })
    } 
  }

  getAverage(): void {

  }

}
