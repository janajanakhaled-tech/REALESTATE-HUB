import { Routes } from '@angular/router';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Properties } from './pages/properties/properties';
import { AddProperty } from './pages/add-property/add-property';
import { PropertyDetails } from './pages/property-details/property-details';
import { EditProperty } from './pages/edit-property/edit-property';
import { BookViewing } from './pages/book-viewing/book-viewing';
import { Profile } from './pages/profile/profile';
import { EditProfile } from './pages/edit-profile/edit-profile';
import { MyBookings } from './pages/my-bookings/my-bookings';
import { AdminBookings } from './pages/admin-bookings/admin-bookings';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { UserManagement } from './pages/user-management/user-management';
import { roleGuard } from './guards/role.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: Signup
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'properties',
    component: Properties
  },
  {
    path: 'add-property',
    component: AddProperty,
    canActivate: [
      roleGuard(['admin', 'agent'])
    ]
  },
  {
    path: 'property-details/:id',
    component: PropertyDetails
  },
   {
  path: 'book-viewing/:id',
  component: BookViewing,
  canActivate: [
    roleGuard(['customer'])
  ]
},
  {
    path: 'edit-property/:id',
    component: EditProperty,
    canActivate: [
      roleGuard(['admin', 'agent'])
    ]
  },
  {
    path: 'profile',
    component: Profile
  },
  {
    path: 'edit-profile',
    component: EditProfile
  },
   {
  path: 'my-bookings',
  component: MyBookings,
  canActivate: [
    roleGuard(['customer'])
  ]
},
   {
  path: 'admin-dashboard',
  component: AdminDashboard,
  canActivate: [
    roleGuard(['admin'])
  ]
},
   {
  path: 'admin-bookings',
  component: AdminBookings,
  canActivate: [
    roleGuard(['admin'])
  ]
},
   {
  path: 'user-management',
  component: UserManagement,
  canActivate: [
    roleGuard(['admin'])
  ]
},
  {
    path: '**',
    redirectTo: 'home'
  }
]; 