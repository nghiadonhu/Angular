import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
    getList() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/sp');
    }
  
    removeItem(id: number): Observable<any> {
      const url = `http://localhost:3000/remove/${id}`;
      return this.http.get<any>(url);     
    }  
    addItem(Tenloai: string): Observable<any> {
      const url = 'http://localhost:3000/add';
      const body = { Tenloai: Tenloai };
      return this.http.post<any>(url, body);
    }
    editItem(id: number, Tenloai: string): Observable<any> {
      const url = `http://localhost:3000/edit/${id}`;
      const body = { Tenloai: Tenloai };
      return this.http.post<any>(url, body);
    }
    getItemById(id: any): Observable<any> {
      const url = `http://localhost:3000/get-one/${id}`;
      return this.http.get<any>(url);
    }
    getItemByIdsp(id: any): Observable<any> {
      const url = `http://localhost:3000/sanpham/get-one/${id}`;
      return this.http.get<any>(url);
    }
    createOrder(orderData: any): Observable<any> {
      return this.http.post(`http://localhost:3000/api/createOrder`, orderData);
    }
}
