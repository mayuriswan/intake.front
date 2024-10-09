import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  newUser = {
    username: "",

    passwordHash: "",
    role: "Regular",
    name: ""

  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('User Management Component initialized');
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser(): void {
    console.log(this.newUser);

    this.userService.addUser(this.newUser).subscribe(() => {
      this.loadUsers(); // Reload the users after adding a new one
      this.resetForm();
    });
  }

  removeUser(userId: string): void {
    this.userService.removeUser(userId).subscribe(() => {
      this.loadUsers(); // Reload the users after deletion
    });
  }

  resetForm(): void {
    this.newUser = {
      name: '',
      username: '',
      passwordHash: '',
      role: 'Regular'
    };
  }
}
