import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

/**
 * This component handles Login functionality. Verifies a user's information before allowing them into the site.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: boolean = false;
  
  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  /**
   * Sends the submitted login information to the back-end server.
   * Navigates to the home page if login was successful, displayes an error if not.
   */
  onSubmit(): void {
    this.error = false;
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      () => {
        this.authService.loggedIn=true;
      },
      (err) => {console.log(err); this.error = true;},
      () => this.router.navigate(['home'])
    );
  }

  /**
   * navigates to the register page
   */
  register(): void {
    this.router.navigate(['register']);
  }

}
