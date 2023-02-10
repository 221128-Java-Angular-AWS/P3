import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})

//Separate test for review page
export class ReviewPageComponent implements OnInit {
  product!: Product;
  rating?: number;
  reviewInt?: number;
  reviews?: Review[];
  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private location: Location, private productService: ProductService) { }

  // retrieves specific product
  ngOnInit(): void {
    this.getProduct();
  }

  // method to retrieve product by id
  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getSingleProduct(id).subscribe(product => this.product = product);
  }

  // return to previous view
  backToOrders(): void {
    this.location.back();
  }

  // displays rating value selected in view
  assignReview(n: number): void {
    this.reviewInt = n;
  }
}
