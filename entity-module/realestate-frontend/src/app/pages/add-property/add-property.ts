import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  PropertyService
} from '../../services/property.service';


@Component({
  selector: 'app-add-property',
  imports: [ReactiveFormsModule],
  templateUrl: './add-property.html',
  styleUrl: './add-property.css'
})
export class AddProperty {

  propertyForm: FormGroup;

  selectedImage: File | null = null;

  selectedDocument: File | null = null;

  isLoading = false;

  message = '';

  errorMessage = '';


  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router
  ) {

    this.propertyForm = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      description: [
        '',
        Validators.required
      ],

      price: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      location: [
        '',
        Validators.required
      ],

      propertyType: [
        '',
        Validators.required
      ],

      bedrooms: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ]

    });

  }


  onFileSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (
      input.files &&
      input.files.length > 0
    ) {

      this.selectedImage =
        input.files[0];

    }

  }


  onDocumentSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (
      input.files &&
      input.files.length > 0
    ) {

      this.selectedDocument =
        input.files[0];

    }

  }


  onSubmit(): void {

    if (this.propertyForm.invalid) {

      this.propertyForm.markAllAsTouched();

      return;

    }


    const formData =
      new FormData();


    formData.append(
      'title',
      this.propertyForm.value.title
    );


    formData.append(
      'description',
      this.propertyForm.value.description
    );


    formData.append(
      'price',
      this.propertyForm.value.price
    );


    formData.append(
      'location',
      this.propertyForm.value.location
    );


    formData.append(
      'propertyType',
      this.propertyForm.value.propertyType
    );


    formData.append(
      'bedrooms',
      this.propertyForm.value.bedrooms
    );


    if (this.selectedImage) {

      formData.append(
        'image',
        this.selectedImage
      );

    }


    if (this.selectedDocument) {

      formData.append(
        'document',
        this.selectedDocument
      );

    }


    this.isLoading = true;

    this.message = '';

    this.errorMessage = '';


    this.propertyService
      .createProperty(formData)
      .subscribe({

        next: (response) => {

          console.log(
            'PROPERTY CREATED:',
            response
          );


          this.isLoading = false;

          this.message =
            'Property added successfully!';


          this.propertyForm.reset();

          this.selectedImage = null;

          this.selectedDocument = null;


          setTimeout(() => {

            this.router.navigate([
              '/properties'
            ]);

          }, 1000);

        },


        error: (error) => {

          console.log(
            'ADD PROPERTY ERROR:',
            error
          );


          this.isLoading = false;

          this.errorMessage =
            error.error?.message ||
            'Could not add property. Please try again.';

        }

      });

  }


  goBack(): void {

    this.router.navigate([
      '/properties'
    ]);

  }

} 