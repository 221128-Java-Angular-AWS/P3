import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as bcrypt from 'bcryptjs';

/**
 * This component allows users to create a new account. 
 * Once a new user is registered, get taken back to the login page to log in as the new user
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new UntypedFormGroup({
    fname: new UntypedFormControl(''),
    lname: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  /**
   * This function sends the new user information to the back-end to be persisted in the database.
   * Navigates back to the login page on success.
   */
  onSubmit(): void {
    this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, bcrypt.hashSync(this.registerForm.get('password')?.value, 10)).subscribe(
      () => console.log("New user registered"),
      (err) => console.log(err),
      () => this.router.navigate(['login'])
    );
  }

}
