import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ApartmentService } from '../apartment.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  buildingType: string[] = ['Standalone', 'Complex', 'Luxury Apartment'];
  propertyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apartmentService: ApartmentService
  ) {
    this.propertyForm = this.fb.group({
      buildingType: ['Standalone', Validators.required],
      buildingName: ['', Validators.required],
      sharedProperty: ['', Validators.required],
      streetAddress: ['', [Validators.required, Validators.minLength(10)]],
      squareFeet: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      term: ['', Validators.required],
      expectedRent: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      Furnished: ['', Validators.required],
      rentNegotiable: [''],
      priceMode: [''],
      amenitiesIncluded: this.fb.group({
        gymFitnessCenter: [false],
        pool: [false],
        parking: [false],
        visitorParking: [false],
        backup: [false],
        garbageDisposal: [false],
        privateLawn: [false],
        waterHeater: [false],
        plantSecurity: [false],
        laundryService: [false],
        Elevator: [false],
        clubHouse: [false],
      }),
      descriptionTitle: ['', Validators.required],
      descriptionContent: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  public onSubmit() {
    if (this.propertyForm.valid) {
      console.log(this.propertyForm.value);
      const newlyAddedApartment = {
        id: this.apartmentService?.apartments?.length + 1,
        title: this.propertyForm.value.descriptionTitle,
        description: this.propertyForm.value.descriptionContent,
        image:
          'https://images1.apartments.com/i2/DsuDseq1Lz1Kg4ZiEpGJLmYX7utc8m8_JP2hFbrvHoY/102/the-landmark-los-angeles-los-angeles-ca-sw-views-from-penthouse-apartment.jpg?p=1',
        location: this.propertyForm.value.streetAddress,
        price: this.propertyForm.value.expectedRent,
        amenities: {
          furnished: this.propertyForm.value.Furnished,
          parking: this.propertyForm.value.amenitiesIncluded.parking,
          pool: this.propertyForm.value.amenitiesIncluded.pool,
        },
      };
      this.apartmentService.addApartment(newlyAddedApartment);
      this.propertyForm.reset();
      alert('Your Property have been listed');
    } else {
      console.log('Form is invalid');
    }
  }

  get f() {
    return this.propertyForm.controls;
  }

  get amenities() {
    return (this.propertyForm.get('amenitiesIncluded') as FormGroup).controls;
  }
}
