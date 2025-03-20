import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addBook(book: any): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateBook(id: number, book: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, book);
  }

  getAuthors(): Observable<any> {
    return this.http.get('http://localhost:8080/api/authors');
  }
}
