import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private storageKey = 'apartments';

  public apartments!: any[] ;

  public loginStatus = new Subject<any>();
  data$: Observable<any> = this.loginStatus.asObservable();

  constructor() {
     this.apartments = this.loadApartments(); 
   }

  public getApartments(): Observable<any[]> {
    return of(this.apartments);
  }

  public getApartmentById(id: number): Observable<any> {
    const apartment = this.apartments.find(ap => ap.id === id);
    return of(apartment);
  }

  public addApartment(apartment: any) {
    this.apartments.push(apartment);
    this.saveApartments();
  }

  private saveApartments() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.apartments));
  }

  private loadApartments(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [
      {
        id: 1,
        title: '2bhk apartment in City Center',
        description: 'A modern, fully furnished apartment located in the heart of the city.',
        image: 'https://images1.apartments.com/i2/DsuDseq1Lz1Kg4ZiEpGJLmYX7utc8m8_JP2hFbrvHoY/102/the-landmark-los-angeles-los-angeles-ca-sw-views-from-penthouse-apartment.jpg?p=1',
        location: 'City Center',
        price: 22000,
        amenities: {
          furnished: true,
          parking: true,
          pool: false
        }
      },
      {
        id: 2,
        title: '3bhk Studio Apartment',
        description: 'A cozy and affordable studio apartment perfect for family.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy-w-ONOx7DpUg4FHEZKhlzwbf-WJBXU6AMAvTkOdEBpqlEodp_jwPTzvxegV8fglb7Qs&usqp=CAU',
        location: 'Magarpatta',
        price: 28000,
        amenities: {
          furnished: true,
          parking: false,
          pool: false
        }
      },
      {
        id: 3,
        title: 'Luxury Penthouse with Ocean View ',
        description: 'Experience luxury living in this spacious penthouse with a stunning ocean view.',
        image: 'https://photos.zillowstatic.com/fp/d6c4e35b48804ecb443904bf353c1847-cc_ft_960.jpg',
        location: 'Marine Drive',
        price: 36000,
        amenities: {
          furnished: true,
          parking: true,
          pool: true
        }
      },
      {
        id: 4,
        title: '4 bhk apartment with pool view',
        description: 'Experience luxury living in this apartment with a stunning view.',
        image: 'https://photos.zillowstatic.com/fp/d6c4e35b48804ecb443904bf353c1847-cc_ft_960.jpg',
        location: 'Hinjewadi',
        price: 32000,
        amenities: {
          furnished: true,
          parking: true,
          pool: true
        }
      },
      {
        id: 5,
        title: '3 bhk Studio apartment',
        description: 'Experience luxury living in this spacious apartment located in the heart of the city.',
        image: 'https://photos.zillowstatic.com/fp/d6c4e35b48804ecb443904bf353c1847-cc_ft_960.jpg',
        location: 'Wakad',
        price: 22500,
        amenities: {
          furnished: true,
          parking: true,
          pool: true
        }
      }
    ];
  }
}

