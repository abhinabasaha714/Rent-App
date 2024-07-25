import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from './create-post.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ApartmentService } from '../apartment.service';

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let apartmentService: jasmine.SpyObj<ApartmentService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ApartmentService', ['addApartment']);

    await TestBed.configureTestingModule({      
      imports: [ ReactiveFormsModule,CreatePostComponent ],
      providers: [
        FormBuilder,
        { provide: ApartmentService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    apartmentService = TestBed.inject(ApartmentService) as jasmine.SpyObj<ApartmentService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with required fields', () => {
    expect(component.propertyForm.contains('buildingType')).toBeTrue();
    expect(component.propertyForm.contains('buildingName')).toBeTrue();
    expect(component.propertyForm.contains('sharedProperty')).toBeTrue();
    expect(component.propertyForm.contains('streetAddress')).toBeTrue();
    expect(component.propertyForm.contains('squareFeet')).toBeTrue();
    expect(component.propertyForm.contains('term')).toBeTrue();
    expect(component.propertyForm.contains('expectedRent')).toBeTrue();
    expect(component.propertyForm.contains('Furnished')).toBeTrue();
    expect(component.propertyForm.contains('rentNegotiable')).toBeTrue();
    expect(component.propertyForm.contains('priceMode')).toBeTrue();
    expect(component.propertyForm.contains('amenitiesIncluded')).toBeTrue();
    expect(component.propertyForm.contains('descriptionTitle')).toBeTrue();
    expect(component.propertyForm.contains('descriptionContent')).toBeTrue();
  });

  it('should call addApartment method on form submission', () => {
    component.propertyForm.setValue({
      buildingType: 'Standalone',
      buildingName: 'Building A',
      sharedProperty: 'Shared',
      streetAddress: '123 Street',
      squareFeet: '1500',
      term: 'Monthly',
      expectedRent: '1000',
      Furnished: 'Yes',
      rentNegotiable: 'No',
      priceMode: 'Fixed',
      amenitiesIncluded: {
        gymFitnessCenter: false,
        pool: true,
        parking: true,
        visitorParking: false,
        backup: false,
        garbageDisposal: false,
        privateLawn: false,
        waterHeater: false,
        plantSecurity: false,
        laundryService: false,
        Elevator: false,
        clubHouse: false,
      },
      descriptionTitle: 'Nice Apartment',
      descriptionContent: 'A nice apartment with good amenities and a great location.',
    });

    component.onSubmit();

    expect(apartmentService.addApartment).toHaveBeenCalled();
    expect(apartmentService.addApartment).toHaveBeenCalledWith(jasmine.objectContaining({
      title: 'Nice Apartment',
      description: 'A nice apartment with good amenities and a great location.',
      price: '1000',
      amenities: jasmine.objectContaining({
        furnished: 'Yes',
        parking: true,
        pool: true
      })
    }));
  });  
});
