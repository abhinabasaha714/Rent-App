import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private searchDataSubject = new BehaviorSubject<string>('');
  searchData$ = this.searchDataSubject.asObservable();

  setSearchData(query: string) {
    this.searchDataSubject.next(query);
  }
}
