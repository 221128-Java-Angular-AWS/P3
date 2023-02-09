import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review.model';
import { ProductService } from 'src/app/services/product.service';
import { Location } from '@angular/common';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.css']
})
export class AllReviewsComponent implements OnInit {
  product!: Product;
  rating?: number;
  reviewInt?: number;
  reviews?: Review[];
  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private location: Location, private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllReviews(); //get reviews on initialization of this component
    console.log(JSON.stringify(this.reviews))
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getSingleProduct(id).subscribe( product => {
      this.product = product;
    });
  }

  /**
   * Get the productId from the URL and subscribe to review service to get list of reviews.
   */
  getAllReviews(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reviewService.getReviews(id).subscribe((reviews) => {
      this.reviews = reviews;
    })
  }

  backToProd(): void {
    this.location.back();
  }
}
