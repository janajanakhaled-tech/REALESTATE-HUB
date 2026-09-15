import {
  Component,
  OnInit,
  ChangeDetectorRef,
  signal
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  Property,
  PropertyService
} from '../../services/property.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-properties',
  imports: [CommonModule],
  templateUrl: './properties.html',
  styleUrl: './properties.css'
})
export class Properties implements OnInit {
  properties = signal<Property[]>([]);
  errorMessage = '';
  currentUser: any = null;
  constructor(
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
    console.log(
      'GETTING PROPERTIES...'
    );
    this.propertyService
      .getAllProperties()
      .subscribe({
        next: (response: any) => {
          console.log(
            'RESPONSE:',
            response
          );
          this.properties.set(
            [...response.data.properties]
          );
          console.log(
            'PROPERTIES:',
            this.properties()
          );
          console.log(
            'NUMBER:',
            this.properties().length
          );
          this.cdr.detectChanges();
          console.log(
            'AFTER CHANGE DETECTION:',
            this.properties().length
          );
        },
        error: (error) => {
          console.error(
            'ERROR:',
            error
          );
          this.errorMessage =
            'Could not load properties.';
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
  goHome(): void {
    this.router.navigateByUrl('/home');
  }
  addProperty(): void {
    if (!this.isAgentOrAdmin()) {
      return;
    }
    this.router.navigateByUrl(
      '/add-property'
    );
  }
  viewProperty(id: string): void {
    this.router.navigateByUrl(
      '/property-details/' + id
    );
  }
} 