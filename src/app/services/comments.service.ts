import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private storageKey = 'comments';
  private comments: { [apartmentId: number]: string[] } = {};

  constructor() {
    this.loadComments();
  }

  private loadComments() {
    const storedComments = localStorage.getItem(this.storageKey);
    if (storedComments) {
      this.comments = JSON.parse(storedComments);
    }
  }

  private saveComments() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.comments));
  }

  public addComment(apartmentId: number, comment: string) {
    if (!this.comments[apartmentId]) {
      this.comments[apartmentId] = [];
    }
    this.comments[apartmentId].push(comment);
    this.saveComments();
  }

  public getComments(apartmentId: number) {
    return this.comments[apartmentId] || [];
  }

}
