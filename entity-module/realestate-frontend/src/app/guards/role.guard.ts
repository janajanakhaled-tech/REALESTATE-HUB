import {
  CanActivateFn,
  Router
} from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
  id: string;
  role: 'admin' | 'customer' | 'agent';
  iat?: number;
  exp?: number;
}
export const roleGuard = (
  allowedRoles: string[]
): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const token =
      localStorage.getItem('token');
    if (!token) {
      return router.parseUrl('/login');
    }
    try {
      const decodedToken =
        jwtDecode<JwtPayload>(token);
      console.log(
        'JWT ROLE:',
        decodedToken.role
      );
      console.log(
        'JWT ID:',
        decodedToken.id
      );
      if (!allowedRoles.includes(decodedToken.role)) {
        return router.parseUrl('/properties');
      }
      return true;
    } catch (error) {
      console.error(
        'Invalid JWT token:',
        error
      );
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return router.parseUrl('/login');
    }
  };
}; 