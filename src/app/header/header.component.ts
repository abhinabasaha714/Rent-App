import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { TextMagnifyDirective } from '../directive/text-magnify.directive';
import { SearchService } from '../services/search.service';

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
  private searchSubject = new Subject<string>();

  constructor(
    private authService: AuthService,
    private wishlistService: WishlistService ,
    private searchService: SearchService   
  ) {}

  ngOnInit(): void {
    this.isLoggedin = this.authService.isLoggedIn();
    this.authService.loginStatus.subscribe((data) => (this.isLoggedin = data));
    this.wishlistService.getWishlist();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.searchService.setSearchData(searchText);
    });
  }

  public logout() {
    this.authService.logout();
    this.isLoggedin = this.authService.isLoggedIn();
  }

  public onSearch(event: any) {
    this.searchSubject.next(event.target.value);
  }
}
