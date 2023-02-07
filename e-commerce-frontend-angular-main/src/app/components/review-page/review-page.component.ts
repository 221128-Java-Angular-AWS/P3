import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {
  product?: Product;
  rating?: number;
  reviewInt?: number;
  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private location: Location, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getSingleProduct(id).subscribe( product => this.product = product);
  }

  backToOrders(): void {
    this.location.back();
  }
  
  test() {
    let productId=5;
    this.reviewService.getAverage(productId).subscribe((rating) => {
      this.rating = rating;
      console.log("rating=" + rating);
      console.log("Oo")
    })
}

assignReview(n: number): void {
  this.reviewInt = n;
}

}
