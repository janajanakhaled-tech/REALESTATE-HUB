import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/bookings';
  constructor(private http: HttpClient) {}
  createBooking(data: any): Observable<any> {
    const token =
      localStorage.getItem('token');
    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    return this.http.post(
      this.apiUrl,
      data,
      { headers }
    );
  }
  getMyBookings(): Observable<any> {
    const token =
      localStorage.getItem('token');
    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    return this.http.get(
      `${this.apiUrl}/my-bookings`,
      { headers }
    );
  }
  cancelBooking(id: string): Observable<any> {
    const token =
      localStorage.getItem('token');
    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    return this.http.patch(
      `${this.apiUrl}/${id}/cancel`,
      {},
      { headers }
    );
  }
  getAllBookings(): Observable<any> {
    const token =
      localStorage.getItem('token');
    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    return this.http.get(
      this.apiUrl,
      { headers }
    );
  }
  updateBookingStatus(
    id: string,
    status: string
  ): Observable<any> {
    const token =
      localStorage.getItem('token');
    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    return this.http.patch(
      `${this.apiUrl}/${id}/status`,
      { status },
      { headers }
    );
  }
}