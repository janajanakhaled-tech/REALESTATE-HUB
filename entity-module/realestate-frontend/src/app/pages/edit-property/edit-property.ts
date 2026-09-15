import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  PropertyService
} from '../../services/property.service';


@Component({
  selector: 'app-edit-property',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-property.html',
  styleUrl: './edit-property.css'
})
export class EditProperty implements OnInit {

  propertyForm: FormGroup;

  propertyId = '';

  selectedImage: File | null = null;

  selectedDocument: File | null = null;

  isLoading = true;

  isSaving = false;

  message = '';

  errorMessage = '';


  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
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


  ngOnInit(): void {

    this.propertyId =
      this.route.snapshot.paramMap.get('id') || '';


    console.log(
      'EDIT PROPERTY ID:',
      this.propertyId
    );


    if (!this.propertyId) {

      this.errorMessage =
        'Property ID not found.';

      this.isLoading = false;

      return;

    }


    this.propertyService
      .getPropertyById(this.propertyId)
      .subscribe({

        next: (response) => {

          console.log(
            'EDIT PROPERTY RESPONSE:',
            response
          );


          const property =
            response.data?.property ||
            response.data ||
            response.property;


          console.log(
            'EDIT PROPERTY:',
            property
          );


          this.propertyForm.patchValue({

            title: property.title,

            description: property.description,

            price: property.price,

            location: property.location,

            propertyType: property.propertyType,

            bedrooms: property.bedrooms

          });


          this.isLoading = false;

          this.cdr.detectChanges();

        },


        error: (error) => {

          console.log(
            'EDIT PROPERTY ERROR:',
            error
          );


          this.isLoading = false;


          this.errorMessage =
            error.error?.message ||
            'Could not load property.';


          this.cdr.detectChanges();

        }

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


    this.isSaving = true;

    this.message = '';

    this.errorMessage = '';


    this.propertyService
      .updateProperty(
        this.propertyId,
        formData
      )
      .subscribe({

        next: (response) => {

          console.log(
            'PROPERTY UPDATED:',
            response
          );


          this.isSaving = false;


          this.message =
            'Property updated successfully!';


          this.cdr.detectChanges();


          setTimeout(() => {

            this.router.navigate([
              '/property-details',
              this.propertyId
            ]);

          }, 1000);

        },


        error: (error) => {

          console.log(
            'UPDATE PROPERTY ERROR:',
            error
          );


          this.isSaving = false;


          this.errorMessage =
            error.error?.message ||
            'Could not update property.';


          this.cdr.detectChanges();

        }

      });

  }


  goBack(): void {

    this.router.navigate([
      '/property-details',
      this.propertyId
    ]);

  }

} 