import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private storageKey = 'wishlist';
  private addedItemsKey = 'addedItems';
  private wishlist: any[] = [];
  private addedItems: Set<number> = new Set();

  constructor() {
    this.loadWishlist();
    this.loadAddedItems();
  }

  private loadWishlist() {
    const storedWishlist = localStorage.getItem(this.storageKey);
    if (storedWishlist) {
      this.wishlist = JSON.parse(storedWishlist);
    }
  }

  private saveWishlist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.wishlist));
  }

  private loadAddedItems() {
    const storedAddedItems = localStorage.getItem(this.addedItemsKey);
    if (storedAddedItems) {
      this.addedItems = new Set(JSON.parse(storedAddedItems));
    }
  }

  private saveAddedItems() {
    localStorage.setItem(this.addedItemsKey, JSON.stringify(Array.from(this.addedItems)));
  }

  public addToWishlist(property: any) {
    if (!this.wishlist.find((item) => item.id === property.id)) {
      this.wishlist.push(property);
      this.addedItems.add(property.id);
      this.saveWishlist();
      this.saveAddedItems();
    }
  }

  public removeFromWishlist(propertyId: number) {
    this.wishlist = this.wishlist.filter((item) => item.id !== propertyId);
    this.addedItems.delete(propertyId);
    this.saveWishlist();
    this.saveAddedItems();
  }

  public getWishlist() {
    return this.wishlist;
  }

  public isAdded(propertyId: number) {
    return this.addedItems.has(propertyId);
  }
}
