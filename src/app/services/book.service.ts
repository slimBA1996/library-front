import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from 'src/app/models/book';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serviceUrl = environment.baseUrl + '/livre';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  dataChange: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) { }


  get data(): Book[] {
    return this.dataChange.value;
  }

  // Retourne un tableau de tous les livres : Livre[]
  getAllBooksService(): Observable<Book[]> {
    return this.http.get<Book[]>(this.serviceUrl);
  }

  // Retourne un seul livre par son nomLivre : Livre
  getOneBookervice(nameBook): Observable<Book> {
    return this.http.get<Book>(this.serviceUrl + '/' + nameBook, this.httpOptions);
  }

  // Retourne le livre créée : Livre
  addBookService(book): Observable<Book> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(book), this.httpOptions);
  }

  // Retourne le livre modifié : Livre
  editBookService(book): Observable<Book> {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(book), this.httpOptions);
  }

  // Ne retourne rien
  deleteBookService(nameBook) {
    return this.http.delete<any>(this.serviceUrl + '/' + nameBook, this.httpOptions);
  }

  getDialogData() {
    return this.dialogData;
  }


  addBook (book: Book): void {
    this.dialogData = book;
  }

  editBook (book: Book): void {
    this.dialogData = book;
  }

  deleteBook (id: number): void {
    console.log(id);
  }
}





