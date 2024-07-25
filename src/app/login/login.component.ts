import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  public login() {
    if (this.authService.login({ username: this.username, password: this.password })) {
      this.router.navigate(['/']);
      this.authService.loginStatus.next(true)
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
