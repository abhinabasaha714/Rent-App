import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from './services/wishlist.service';
import { TextMagnifyDirective } from './directive/text-magnify.directive';
import { BehaviorSubject, Observable, startWith, switchMap, map } from 'rxjs';
import { ApartmentService } from './apartment.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, CommonModule, TextMagnifyDirective, FormsModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'rent-app';
  isLoggedin: boolean = false;
  searchData = new BehaviorSubject<string>('');
  filteredApartments$: Observable<any[]> | undefined;
  searchText: string = '';

  constructor( private authService: AuthService, private wishlistService: WishlistService, private apartmentService: ApartmentService){
    
  }
  ngOnInit(): void {
    this.isLoggedin = this.authService.isLoggedIn();
    this.authService.loginStatus.subscribe((data) => this.isLoggedin = data);    
    this.wishlistService.getWishlist();
    
  }

  public logout(){
    this.authService.logout();
    this.isLoggedin=this.authService.isLoggedIn();
  }

}
