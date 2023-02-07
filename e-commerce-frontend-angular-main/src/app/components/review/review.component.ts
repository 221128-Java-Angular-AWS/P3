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
  //booleanReviewed?: boolean;
  //@Output() reviewedChanged: EventEmitter<boolean> = new EventEmitter();
  //@Input() user?: User;
  //@Input() product?: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService, private reviewService: ReviewService, private profileService: ProfileService) { }

  ngOnInit(): void {
    //this.onInit().then(response => console.log("1) Response for ngOnInit: " + response));
    this.profileService.getUser().subscribe( 
      (response) => 
        {
        this.user = response;
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getSingleProduct(id).subscribe(
          (product) => 
            {this.product = product;
            //console.log("1) Product set to " + this.product.id);
            this.checkReviewed();
            });
        }
    );
  }
  
/*
  async onInit(){
    
        const id = await Number(this.route.snapshot.paramMap.get('id'));
        await this.productService.getSingleProduct(id).subscribe((product) => {
          this.product = product;
          console.log("1) Product set to " + this.product.id);
        });
        await this.checkReviewed().then(result => console.log("2) check Review()" + result))//.then(this.reviewed = result);
        await console.log("3) On Init "+this.reviewed);
      
   
    var promise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getSingleProduct(id).subscribe((product) => {
          this.product = product;
          console.log("1) Product set to " + this.product.id);
        });
        this.checkReviewed().then(result => console.log("2) check Review()" + result))//.then(this.reviewed = result);
        console.log("3) On Init "+this.reviewed);
        resolve();
      }, 10000)
    })
    
  }
  */

  assignReview(n: number): void {
    this.reviewInt = n;
  }

  onSubmit(): void {
    if (this.reviewInt) {
      this.submitted=true;
      let review = new Review(this.userInput, this.reviewInt, this.user, this.product);
      //console.log(JSON.stringify(review) + "Is the review JSON." + this.product?.id)
      //this.reviewService.ping().subscribe(((ping)=> {this.ping = ping}));
      //console.log(this.ping);
      this.reviewService.postReview(review).subscribe((review) => {
        this.review = review;
      })
      //this.reviewedChanged.emit(this.reviewed);
      this.checkReviewed();
    }
  }

  checkReviewed(): void{
    //console.log("i) Entering the dark zone:");
    let booleanReview = false;
    if(this.product){
      this.reviewService.getReview(this.product?.id).subscribe((hasBeenReviewed: Review[]) => {
        this.hasBeenReviewed = hasBeenReviewed;
        //console.log("ii) Response happens now, hasBeenReviewed Object" +JSON.stringify(this.hasBeenReviewed));
        if(this.hasBeenReviewed.length >0) 
          {
            booleanReview = true;
          }
          this.reviewed = booleanReview;
      })
    } 
    //console.log(booleanReview)
    //return Promise.resolve(booleanReview);
    //if(this.hasBeenReviewed === undefined) console.log("Something is very broken")
    //else {console.log("OO: nelly! " + this.hasBeenReviewed[0].rating);}
    //console.log(booleanReview + "boolean");
    //return booleanReview;
  }

  getAverage(): void {

  }

}
