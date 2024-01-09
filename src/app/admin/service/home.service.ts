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

    getListdh() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/dh');
    }
    getListnv() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/nv');
    }

    getListncc() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/ncc');
    }

    getItemByIdctdh(id: any): Observable<any> {
      const url = `http://localhost:3000/ctdh/get-one/${id}`;
      return this.http.get<any>(url);
    }

    getItemByIddh(id: any): Observable<any> {
      const url = `http://localhost:3000/dh/get-one/${id}`;
      return this.http.get<any>(url);
    }

    getItemByIdcthdn(id: any): Observable<any> {
      const url = `http://localhost:3000/cthdn/get-one/${id}`;
      return this.http.get<any>(url);
    }

    getListctdh() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/ctdh');
    }

    getListcthdn() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/cthdn');
    }
    getListhdn() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/hoadonnhap');
    }

    upload(file: any): Observable<any> {
      const formData = new FormData();
      formData.append('Anh', file);
      return this.http.post<any>('http://localhost:3000/upload', formData);
    }

    getListsp() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/sp');
    }
    getListkh() : Observable<any[]> {
      return this.http.get<any>('http://localhost:3000/kh');
    }
    addItemsp(newItem: any): Observable<any> {
      const url = 'http://localhost:3000/sanpham/add';
      return this.http.post<any>(url, newItem);
    }

    addItemkh(newItem: any): Observable<any> {
      const url = 'http://localhost:3000/khachhang/add';
      return this.http.post<any>(url, newItem);
    }
    addItemncc(newItem: any): Observable<any> {
      const url = 'http://localhost:3000/ncc/add';
      return this.http.post<any>(url, newItem);
    }

    addItemcthdn(newItem: any): Observable<any> {
      const url = 'http://localhost:3000/cthdn/add';
      return this.http.post<any>(url, newItem);
    }

    addItemhdn(newItem: any): Observable<any> {
      const url = 'http://localhost:3000/hoadonnhap/add';
      return this.http.post<any>(url, newItem);
    }

    addItemnv(newItem: any): Observable<any> {
      const url = 'http://localhost:3000/nhanvien/add';
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
    removeItemncc(id: number): Observable<any> {
      const url = `http://localhost:3000/ncc/remove/${id}`;
      return this.http.get<any>(url);     
    } 
    removeItemnv(id: number): Observable<any> {
      const url = `http://localhost:3000/nhanvien/remove/${id}`;
      return this.http.get<any>(url);     
    } 

    removeItemkh(id: number): Observable<any> {
      const url = `http://localhost:3000/khachhang/remove/${id}`;
      return this.http.get<any>(url);     
    } 
    removeItemhdn(id: number): Observable<any> {
      const url = `http://localhost:3000/hoadonnhap/remove/${id}`;
      return this.http.get<any>(url);     
    }

    removeItemdh(id: number): Observable<any> {
      const url = `http://localhost:3000/donhang/remove/${id}`;
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
    
    editItemhdn(id: number,
      Nhanvien_id: number,
      Thanhtien: any,
      Ngaynhap: any,
      Ncc_id: number): Observable<any> {
      const url = `http://localhost:3000/hoadonnhap/edit/${id}`;
      const body = {
        Nhanvien_id: Nhanvien_id,
        Thanhtien: Thanhtien,
        Ngaynhap: Ngaynhap,
        Ncc_id: Ncc_id,
      };
    
      return this.http.post<any>(url, body);
    }

    editItemnv(id: number,
      Tennhanvien: any,
      Ngaysinh: any,
      Sdt: any,
      Diachi: any,
      Email: any,
      // Anh: any,
      ): Observable<any> {
      const url = `http://localhost:3000/nhanvien/edit/${id}`;
      const body = {
        Tennhanvien: Tennhanvien,
        Ngaysinh: Ngaysinh,
        Sdt: Sdt,
        Diachi: Diachi,
        Email: Email,
        // Anh: Anh,
      };
    
      return this.http.post<any>(url, body);
    }

    editItemncc(id: number,
      Tenncc: any,
      Diachi: any,
      Sdt: any,
      
      ): Observable<any> {
      const url = `http://localhost:3000/ncc/edit/${id}`;
      const body = {
        Tenncc: Tenncc,
        Diachi: Diachi,
        Sdt: Sdt
       
      };
    
      return this.http.post<any>(url, body);
    }

    editItemkh(id: number,
      Tenkhachhang: any,
      // Anhdaidien: any,
      Ngaysinh: any,
      Sdt: any,
      Diachi: any,
      Email: any,
     
      
      
      ): Observable<any> {
      const url = `http://localhost:3000/khachhang/edit/${id}`;
      const body = {
        Tenkhachhang: Tenkhachhang,
        // Anhdaidien: Anhdaidien,
        Ngaysinh: Ngaysinh,
        Sdt: Sdt,
        Diachi: Diachi,
        Email: Email
     
       
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

    getItemByIdncc(id: any): Observable<any> {
      const url = `http://localhost:3000/ncc/get-one/${id}`;
      return this.http.get<any>(url);
    }

    getItemByIdnv(id: any): Observable<any> {
      const url = `http://localhost:3000/nhanvien/get-one/${id}`;
      return this.http.get<any>(url);
    }

    getItemByIdkh(id: any): Observable<any> {
      const url = `http://localhost:3000/khachhang/get-one/${id}`;
      return this.http.get<any>(url);
    }
    getItemByIdhdn(id: any): Observable<any> {
      const url = `http://localhost:3000/hoadonnhap/get-one/${id}`;
      return this.http.get<any>(url);
    }

    login(credentials: { name: string; password: string }): Observable<any> {
      return this.http.post<any>(`http://localhost:3000/login`, credentials);
    }

   
}
