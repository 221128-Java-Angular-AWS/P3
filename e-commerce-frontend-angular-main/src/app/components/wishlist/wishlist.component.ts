import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Product[] = [];

  ngOnInit(): void {
    console.log('getting products for wishlist');
    this.productService.getProducts().subscribe(
      (resp) => this.products = resp,
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
  }

}
