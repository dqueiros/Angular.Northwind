import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://localhost:7262/api/categories';

  constructor(private http: HttpClient) {}

  create(category: Category) {
    return this.http.post<Category>(this.apiUrl, category);
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  update(category: Category): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${category.categoryID}`, category);
  }

  updateName(id: number, categoryName: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/categoryName`, categoryName);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}