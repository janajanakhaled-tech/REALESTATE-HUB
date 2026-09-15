import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Property {
  _id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
   image: string | null;
document: string | null;
bedrooms: number;
}

export interface PropertiesResponse {
  status: string;
  data: {
    properties: Property[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl = 'http://localhost:5000/properties';

  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<PropertiesResponse> {
    return this.http.get<PropertiesResponse>(this.apiUrl);
  }

  getPropertyById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createProperty(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateProperty(id: string, data: FormData): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteProperty(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}