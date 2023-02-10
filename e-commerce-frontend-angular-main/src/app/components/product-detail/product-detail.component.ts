import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { WishListService } from 'src/app/services/wishList.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  userId!: number;
  rating!: number;
  wishListed: Boolean = false;

  constructor(
    private productService: ProductService,
    private wishListService: WishListService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  // retrieves detailed data pertaining to specific product
  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getSingleProduct(productId).subscribe((product) => {
      this.product = product;
    });
    this.productService.getUserId().subscribe((id)=> this.userId = id);
    this.reviewService.getAverage(productId).subscribe((rating) => {
      this.rating = rating;
    })

  // Checks to see if item is present on current user's wishlist to determine
  // which buttons should be rendered
    this.wishListService.checkIfWishListed(productId)
    .subscribe((isWishListed) => {
      this.wishListed =  Boolean(isWishListed);
    });
  }

  // adds the item to the cart
  addToCart(addForm: NgForm, product: Product): void {
    let quantity: number = Number(addForm.value.quantity)
    this.productService.addCart(this.userId, product.id, quantity).subscribe((cart)=>{
      console.log(cart);
      this.router.navigate(['cart']);
    });
  }

  // displays all reviews of specific product
  goToAllReviews() {
  this.router.navigate([`reviews/${this.product.id}`])
  }

  // adds product to wishlist
  addToWishList(product: Product): void {
    this.wishListed = true;
    this.wishListService.addToWishList(product.id)
    .subscribe();
  }

  removeFromWishList(product: Product): void {
    this.wishListed = false;
    this.wishListService.removeFromWishList(product.id)
    .subscribe();
  }
}
