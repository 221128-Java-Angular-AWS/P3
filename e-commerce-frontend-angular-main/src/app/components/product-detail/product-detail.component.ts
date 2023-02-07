import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  userId!: number;
  rating!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private reviewService: ReviewService) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getSingleProduct(productId).subscribe((product) => {
      this.product = product;
    });
    this.productService.getUserId().subscribe((id)=> this.userId = id);
    this.reviewService.getAverage(productId).subscribe((rating) => {
      this.rating = rating;
      console.log("rating=" + rating);
      console.log("Oo")
    })
  }

  addToCart(addForm: NgForm, product: Product): void {

    let quantity: number = Number(addForm.value.quantity)
    this.productService.addCart(this.userId, product.id, quantity).subscribe((cart)=>{
      console.log(cart);
      this.router.navigate(['cart']);
    });
  }

  goToAllReviews() {
  this.router.navigate([`reviews/${this.product.id}`])
  }
  
}
