import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'customer' | 'agent';
  phone: string;
  image?: string;
}
export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/v1/auth';
  constructor(private http: HttpClient) {}
  signup(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/signup`,
      data
    );
  }
  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      data
    );
  }
  getMe(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<any>(
      `${this.apiUrl}/me`,
      { headers }
    );
  }
  updateProfile(data: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.patch<any>(
      'http://localhost:5000/api/v1/users/profile',
      data,
      { headers }
    );
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
} 