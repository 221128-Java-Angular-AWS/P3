import { NgModule } from '@angular/core';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AllReviewsComponent } from './components/all-reviews/all-reviews.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: DisplayProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "orders", component: OrdersComponent },
  { path: "orders/:id", component: OrderDetailsComponent },
  { path: "profile", component: ProfileComponent},
  { path: "product/:id", component: ProductDetailComponent },
  { path: "review/:id", component: ReviewPageComponent},
  { path: "reviews/:id", component: AllReviewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
