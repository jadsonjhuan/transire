import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private uri = 'http://localhost:8081/produtos';

  constructor(private http: HttpClient) { }

  listAll(): Observable<any> {
    return this.http.get<any>(`${this.uri}`);
  }

  createOrUpdate(produto): Observable<any> {
    return this.http.post<any>(`${this.uri}`, produto);
  }

  findById(id): Observable<any> {
    return this.http.get<any>(`${this.uri}/${id}`);
  }

  delete(id): Observable<any> {
    return this.http.delete<any>(`${this.uri}/${id}`);
  }
}
