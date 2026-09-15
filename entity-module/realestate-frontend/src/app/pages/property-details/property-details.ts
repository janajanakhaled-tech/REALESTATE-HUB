import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Property,
  PropertyService
} from '../../services/property.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-property-details',
  imports: [],
  templateUrl: './property-details.html',
  styleUrl: './property-details.css'
})
export class PropertyDetails implements OnInit {
  property: Property | null = null;
  isLoading = true;
  errorMessage = '';
  currentUser: any = null;
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
    console.log(
      'CURRENT USER:',
      this.currentUser
    );
    console.log(
      'CURRENT ROLE:',
      this.currentUser?.role
    );
    const id =
      this.route.snapshot.paramMap.get('id');
    console.log(
      'PROPERTY ID:',
      id
    );
    if (!id) {
      this.errorMessage =
        'Property ID not found.';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }
    this.propertyService
      .getPropertyById(id)
      .subscribe({
        next: (response) => {
          console.log(
            'PROPERTY DETAILS RESPONSE:',
            response
          );
          this.property =
            response.data?.property ||
            response.data ||
            response.property;
          console.log(
            'PROPERTY DETAILS:',
            this.property
          );
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.log(
            'PROPERTY DETAILS ERROR:',
            error
          );
          this.isLoading = false;
          this.errorMessage =
            error.error?.message ||
            'Could not load property details.';
          this.cdr.detectChanges();
        }
      });
  }
  isAgentOrAdmin(): boolean {
    return (
      this.currentUser?.role === 'agent' ||
      this.currentUser?.role === 'admin'
    );
  }
  goBack(): void {
    this.router.navigateByUrl(
      '/properties'
    );
  }
  addProperty(): void {
    if (!this.isAgentOrAdmin()) {
      return;
    }
    this.router.navigateByUrl(
      '/add-property'
    );
  }
  goEditProperty(): void {
    if (!this.isAgentOrAdmin()) {
      return;
    }
    if (this.property?._id) {
      this.router.navigate([
        '/edit-property',
        this.property._id
      ]);
    }
  }
  deleteProperty(): void {
    if (!this.isAgentOrAdmin()) {
      return;
    }
    if (!this.property?._id) {
      return;
    }
    const confirmed = confirm(
      'Are you sure you want to delete this property?'
    );
    if (!confirmed) {
      return;
    }
    this.propertyService
      .deleteProperty(this.property._id)
      .subscribe({
        next: (response) => {
          console.log(
            'PROPERTY DELETED:',
            response
          );
          this.router.navigateByUrl(
            '/properties'
          );
        },
        error: (error) => {
          console.log(
            'DELETE PROPERTY ERROR:',
            error
          );
          this.errorMessage =
            error.error?.message ||
            'Could not delete property.';
          this.cdr.detectChanges();
        }
      });
  }
  bookViewing(): void {
    if (this.property?._id) {
      this.router.navigate([
        '/book-viewing',
        this.property._id
      ]);
    }
  }
} 