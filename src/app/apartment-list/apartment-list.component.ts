import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartmentService } from '../apartment.service';
import { CommonModule } from '@angular/common';
import { Observable, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-apartment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apartment-list.component.html',
  styleUrl: './apartment-list.component.scss'
})
export class ApartmentListComponent {
  apartment: any;
  filteredApartments$!: Observable<any[]>;

  constructor(private route: ActivatedRoute, private apartmentService: ApartmentService) {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.apartmentService.getApartmentById(Number(id)).subscribe(data => this.apartment = data);
  }

  // ngOnInit(): void {
  //   this.filteredApartments$ = this.searchService.searchQuery$.pipe(
  //     startWith(''),
  //     switchMap(query =>
  //       this.apartmentService.getApartments().pipe(
  //         map(apartments => {
  //           query = query.toLowerCase();
  //           if (!query) {
  //             return apartments; // Show all records if there's no query
  //           }
  //           return apartments.filter(apartment =>
  //             apartment.title.toLowerCase().includes(query) ||
  //             apartment.description.toLowerCase().includes(query) ||
  //             apartment.location.toLowerCase().includes(query)
  //           );
  //         })
  //       )
  //     )
  //   );
  // }
}


