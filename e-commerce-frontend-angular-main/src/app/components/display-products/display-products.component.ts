import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
/**
 * Used as the home page, this component displays all products in the database
 */
export class DisplayProductsComponent implements OnInit {

  allProducts: Product[] = [];

  constructor(private productService: ProductService, private profileService: ProfileService) { }

  // retrieves all products in database
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (resp) => this.allProducts = resp,
      (err) => console.log(err),
      () => console.log("Products Retrieved")
    );
  }

}
