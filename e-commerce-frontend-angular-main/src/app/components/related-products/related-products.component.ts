import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
/**
 * This component displays up to 4 randomly sorted products of the same genre
 * as the product-detail object
 */
export class RelatedProductsComponent implements OnInit {

  @Input() currentProduct = new Product(0,"Test Object",10,"This is a test object",10.99,"Picture String", "nothing");

  relatedProduct: Product[] = [];

  count: number = 0;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getRelatedProduct();
  }

  /**
   * Using the product detailed view, grabs the genre and searches for all other
   * products sharing that genre excluding the id of the detailed view product
   */
  getRelatedProduct() {
    this.productService.getProductByGenre(this.currentProduct.genre, this.currentProduct.id).subscribe(
      (resp) => this.relatedProduct = resp,
      (err) => console.log(err),
      () => console.log("Related Products Retrieved")
    );
  }

}