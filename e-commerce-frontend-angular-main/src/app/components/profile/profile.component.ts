import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?: User;
  editUser: boolean = false;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.profileService.getUser().subscribe(
      (resp) => this.user = resp,
      (err) => console.log(err),
      () => console.log("User retrieved")
    );
  }

  editMode(): void {
    this.editUser = true;
  }

  cancelEdit(): void {
    this.editUser = false;
  }

  save(email: string, firstName: string, lastName: string, password?: string) {
    let updateUser = new User()
    if (this.user != undefined) {
      updateUser.id = this.user.id;
    }

    updateUser.email = email;
    updateUser.firstName = firstName;
    updateUser.lastName = lastName;
    // add more security to password change
    updateUser.password = password;

    this.profileService.postUser(updateUser).subscribe(
      (resp) => {this.user = resp,
        this.editUser = false;
      },
      (err) => console.log(err),
      () => console.log("User profile updated")
    );
    this.editUser
  }

}
