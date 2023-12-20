import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 
  constructor(private http: HttpClient) { }
    getList() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/');
    }

    upload(file: any): Observable<any> {
      const formData = new FormData();
      formData.append('Anh', file);
      return this.http.post<any>('http://localhost:3000/upload', formData);
    }

    getListsp() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/sp');
    }
    addItemsp(newItem: any): Observable<any> {
      const url = 'http://localhost:3000/sanpham/add';
      return this.http.post<any>(url, newItem);
    }
    
    removeItem(id: number): Observable<any> {
      const url = `http://localhost:3000/remove/${id}`;
      return this.http.get<any>(url);     
    }  

    removeItemsp(id: number): Observable<any> {
      const url = `http://localhost:3000/sanpham/remove/${id}`;
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

    editItemsp(id: number, Maloai_id: any, Tensanpham: any, Anh: any, Soluong: any, Gia: any, Maluc: any, PhanKhuc: any, VongTuaMay: any, MoMenXoan: any, Giakhuyenmai: any, ViewCount: any, ReducePrice: any): Observable<any> {
      const url = `http://localhost:3000/sanpham/edit/${id}`;
      const body = {
        Maloai_id: Maloai_id,
        Tensanpham: Tensanpham,
        Anh: Anh,
        Soluong: Soluong,
        Gia: Gia,
        Maluc: Maluc,
        PhanKhuc: PhanKhuc,
        VongTuaMay: VongTuaMay,
        MoMenXoan: MoMenXoan,
        Giakhuyenmai: Giakhuyenmai,
        ViewCount: ViewCount,
        ReducePrice: ReducePrice
      };
    
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

   
}