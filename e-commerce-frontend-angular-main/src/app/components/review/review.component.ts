import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  reviewed: boolean = false;
  output?: string;
  ping?: string;
  user?: User;
  product?: Product;
  hasBeenReviewed?: Review[];
  custom: string = "This is output";
  //@Output() reviewedChanged: EventEmitter<boolean> = new EventEmitter();
  //@Input() user?: User;
  //@Input() product?: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getSingleProduct(id).subscribe((product) => {
      this.product = product;
    });
    this.reviewed = this.checkReviewed();
  }

  assignReview(n: number): void {
    this.reviewInt = n;
  }

  onSubmit(): void {
    if (this.reviewInt) {
      this.submitted=true;
      let review = new Review(this.userInput, this.reviewInt, this.user, this.product);
      console.log(JSON.stringify(review) + "Is the review JSON." + this.product?.id)
      //this.reviewService.ping().subscribe(((ping)=> {this.ping = ping}));
      //console.log(this.ping);
      this.reviewService.postReview(review).subscribe((review) => {
        this.review = review;
      })
      //this.reviewedChanged.emit(this.reviewed);
    }
  }

  checkReviewed():boolean {
    let booleanReview = false;
    console.log(this.product?.id);
    if(this.product){
      //console.log("product: "+this.product.id);
      this.reviewService.getReview(this.product?.id).subscribe((hasBeenReviewed) => {
        this.hasBeenReviewed = hasBeenReviewed;
      })
      if(this.hasBeenReviewed) booleanReview = true;
    }
    if(this.hasBeenReviewed === undefined) console.log("Something is very broken")
    else {console.log("OO: nelly! " + this.hasBeenReviewed[0].rating);}
    
    console.log(booleanReview + "boolean");
    return booleanReview;
  }
}
