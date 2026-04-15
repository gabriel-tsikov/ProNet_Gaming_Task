import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HouseCardModel } from '../models/house-card';
import { HouseDetailModel } from '../models/house-details';

@Injectable({
  providedIn: 'root'
})
export class HousesService {
  private apiUrl = 'http://localhost:4000/houses';

  constructor(private http: HttpClient) {}

  getHouses(page: number, pageSize: number): Observable<PagedResponse<HouseCardModel>> {
    return this.http.get<PagedResponse<HouseCardModel>>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`).pipe(
      catchError((error) => {
        console.error('Error fetching houses:', error);
        return throwError(() => new Error('Failed to fetch houses'));
      })
    );
  }

  getHouseById(id: string): Observable<HouseDetailModel> {
    return this.http.get<HouseDetailModel>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching house:', error);
        return throwError(() => new Error('Failed to fetch house details'));
      })
    );
  }
} 