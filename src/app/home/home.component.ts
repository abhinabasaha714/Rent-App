import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../apartment.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { TextMagnifyDirective } from '../directive/text-magnify.directive';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TextMagnifyDirective, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  apartments: any[] = [];
  currentApartment: any;
  searchText: any;
  currentIndex =0;

  constructor(private apartmentService: ApartmentService, private wishlistService: WishlistService) {
  }
  ngOnInit(): void {
    this.loadApartments();
    this.currentApartment = this.apartments[0]; 
    
  }

  public loadApartments() {
    this.apartmentService.getApartments().subscribe(data => this.apartments = data);
  }

  public addToWishlist(property: any) {
    this.wishlistService.addToWishlist(property);
  }

  public isAdded(id: number) {
    return this.wishlistService.isAdded(id);
  } 

  get currentImage() {
    return this.apartmentService.apartments[this.currentIndex];
  }

  public nextImage() {
    if (this.currentIndex < this.apartmentService.apartments.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; 
    }
  }

  public previousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.apartmentService.apartments.length - 1;
    }
  }
  
}
