import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartCount: number = 0;
  subscription!: Subscription;

  products: Product[] = [];
  noResults = false;

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  /**
   * This method will search for products containing the "filter" variable
   * @param filter the search prompt
   */
  searchForProducts(filter: string){
    this.noResults = false;
    if(filter == ""){
      this.products = [];
    }
    else{
      this.productService.searchProduct(filter)
      .subscribe((products) => {
        this.products = products;
        if(products.length == 0){
          this.noResults = true;
        }
      });
    }
  }

  /**
   * This method will reset the search prompt
   */
  resetSearch(){
    this.products = [];
    (<HTMLInputElement>document.getElementById("searchbar")).value = "";
    this.noResults = false;
  }

}
