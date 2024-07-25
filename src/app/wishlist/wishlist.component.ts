import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  wishlist: any[] = [];

  constructor(private wishlistService: WishlistService){}

  ngOnInit(): void {
      this.wishlist = this.wishlistService.getWishlist();
  }

  public removeFromWishlist(id: number) {
    this.wishlistService.removeFromWishlist(id);
    this.wishlist = this.wishlistService.getWishlist();
  }
}
