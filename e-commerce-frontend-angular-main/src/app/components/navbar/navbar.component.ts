import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartCount: number = 0;
  subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { }
  
  ngOnInit(): void {
    /*
    let userId: number = Number(localStorage.getItem("user"));
   this.subscription = this.productService.getCart2(userId).subscribe((data: any)=>{
      data.forEach(
        (element: any)=> {
          this.cartCount += element.quantity;
        }
      )
    });*/
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
