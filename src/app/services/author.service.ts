import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface Author {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = 'http://localhost:8080/api/authors';

  constructor(private http: HttpClient) {}

  // getAuthors(): Observable<ApiResponse<Author[]>> {
  //   return this.http.get<ApiResponse<Author[]>>(this.apiUrl);
  // }
  getAuthors(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

 deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addAuthor(author: { name: string ,place: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, author);
  }

  getAuthorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  updateAuthor(id: number, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedData);
  }
  
  
}
