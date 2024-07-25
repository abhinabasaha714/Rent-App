import { Component } from '@angular/core';
import { BehaviorSubject, Observable, startWith, switchMap, map } from 'rxjs';
import { ApartmentService } from '../apartment.service';
import { AuthService } from '../auth/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { TextMagnifyDirective } from '../directive/text-magnify.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    TextMagnifyDirective,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedin: boolean = false;
  searchText = '';
  constructor(
    private authService: AuthService,
    private wishlistService: WishlistService    
  ) {}
  
  ngOnInit(): void {
    this.isLoggedin = this.authService.isLoggedIn();
    this.authService.loginStatus.subscribe((data) => (this.isLoggedin = data));
    this.wishlistService.getWishlist();
  }

  public logout() {
    this.authService.logout();
    this.isLoggedin = this.authService.isLoggedIn();
  }
}
