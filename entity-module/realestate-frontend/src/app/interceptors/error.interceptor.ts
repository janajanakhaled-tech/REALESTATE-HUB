import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      console.error(
        'HTTP ERROR:',
        error
      );
      if (error.status === 401) {
        console.error(
          'Unauthorized - Please login again.'
        );
      }
      if (error.status === 403) {
        console.error(
          'Forbidden - You do not have permission.'
        );
      }
      if (error.status === 404) {
        console.error(
          'Resource not found.'
        );
      }
      if (error.status >= 500) {
        console.error(
          'Server error. Please try again later.'
        );
      }
      return throwError(() => error);
    })
  );
};