import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, Observable } from 'rxjs';
interface ThongKeResponse {
    totalRevenue: number;
  }
@Injectable({
  providedIn: 'root'
})
export class ThongKeService {
 
  constructor(private http: HttpClient) { }
    Thongkedaynow() : Observable<ThongKeResponse> {
      return this.http.get<any>('http://localhost:3000/thongke');
    }

    Thongkemonnow() : Observable<ThongKeResponse> {
      return this.http.get<any>('http://localhost:3000/thongke/monthly');
    }
    Thongkeyearnow() : Observable<ThongKeResponse> {
      return this.http.get<any>('http://localhost:3000/thongke/yearly');
    }

    getYearlyRevenue(year: number): Observable<ThongKeResponse> {
        return this.http.get<ThongKeResponse>(`http://localhost:3000/revenue/yearly?year=${year}`);
    }

    getStatistics(year?: number, month?: number, day?: number): Observable<ThongKeResponse[]> {
        let url = `http://localhost:3000/revenue/statistics`;
    
        if (year) {
          url += `?year=${year}`;
          if (month) {
            url += `&month=${month}`;
            if (day) {
              url += `&day=${day}`;
            }
          }
        }
    
        return this.http.get<ThongKeResponse[]>(url);
      }
}
    
   

