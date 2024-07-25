import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {    
  }

  public signup() {
    if (this.authService.signup({ username: this.username, password: this.password })) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'User already exists!';
    }
  }
}
