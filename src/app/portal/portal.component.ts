import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service'; // Assuming there's an AuthService to handle user roles

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {}
  logout(): void {
    // Clear session or token information
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
  // Check if the user is admin
  isAdmin(): boolean {
    return this.authService.getRole() === 'Admin';
  }
}
