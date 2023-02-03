import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review.model';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';

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
  pending: boolean = true;
  output?: string;
  ping?: string;
  user?: User;
  product?: Product;
  //@Input() user?: User;
  //@Input() product?: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getSingleProduct(id).subscribe((product) => {
      this.product = product;
    });
  }

  assignReview(n: number): void {
    this.reviewInt = n;
  }

  onSubmit(): void {
    if (this.reviewInt) {
      this.submitted=true;
      let review = new Review(this.userInput, this.reviewInt, this.user, this.product);
      console.log(JSON.stringify(review) + "Is the review JSON." + this.product?.id)
      this.reviewService.ping().subscribe(((ping)=> {this.ping = ping}));
      console.log(this.ping);
      this.reviewService.postReview(review).subscribe((review) => {
        this.review = review;
      })
    }
  }
}
