import { Component, OnInit } from '@angular/core';
import { ThongKeService } from '../service/thongke.service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  // styleUrls: ['./thongke.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  
   
  ]
})
export class ThongkeComponent implements OnInit {
  constructor(private api : ThongKeService, private router: Router,private decimalPipe: DecimalPipe) {}
  subjects: any;
  totalRevenue!: number;

  totalRevenuechoose!: number;
  totalRevenueallchoose!: number;
  selectedYear!: number;
  availableYears: number[] = [];

  totalRevenuemon!: number;
  totalRevenueyear!: number;



  selectedMonth!: number;
  selectedDay!: number;
  
  availableMonths: any[] = [];
  availableDays: any[] = [];
  ngOnInit(): void {
    this.fetchThongKe();
    this.ThongKeMon();
    this.ThongKeYear();
    // this.availableYears = [2024, 2023, 2022]; // Thay thế bằng danh sách năm thực tế hoặc lấy từ API

    // this.selectedYear = this.availableYears[0];
    // this.fetchYearlyRevenue(this.selectedYear);
    this.availableYears = [2024, 2023, 2022]; // Thay thế bằng danh sách năm thực tế hoặc lấy từ API

    // Chọn năm đầu tiên làm năm mặc định
    this.selectedYear = this.availableYears[0];

    // Lấy danh sách các tháng
    // this.availableMonths = Array.from({ length: 12 }, (_, i) => i + 1);
    this.availableMonths = ['', ...Array.from({ length: 12 }, (_, i) => i + 1)];

    // Chọn tháng hiện tại làm tháng mặc định
    this.selectedMonth = new Date().getMonth() + 1;

    // Lấy danh sách các ngày
    this.availableDays = ['',...Array.from({ length: 31 }, (_, i) => i + 1)];

    // Chọn ngày hiện tại làm ngày mặc định
    this.selectedDay = new Date().getDate();

    // Gọi API khi trang được tải lần đầu
    this.fetchStatistics();
  }


  fetchStatistics(): void {
    
    this.api.getStatistics(this.selectedYear, this.selectedMonth, this.selectedDay).subscribe(
      (data) => {
        // Xử lý dữ liệu nhận được từ API
        // Ví dụ: tính tổng doanh thu từ mảng data
        this.totalRevenuechoose = data.reduce((total, item) => total + item.totalRevenue, 0);
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Xử lý lỗi nếu cần
      }
    );
  }

  onYearChange(): void {
    // Gọi API khi năm được chọn thay đổi
    this.fetchStatistics();
  }

  onMonthChange(): void {
    // Gọi API khi tháng được chọn thay đổi
    this.fetchStatistics();
  }

  onDayChange(): void {
    // Gọi API khi ngày được chọn thay đổi
    this.fetchStatistics();
  }


















  fetchThongKe(): void {
    this.api.Thongkedaynow().subscribe(
      (data) => {
        console.log(data.totalRevenue)
        console.log(this.totalRevenue)
        this.totalRevenue = data.totalRevenue;
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    );
  }


  ThongKeMon(): void {
    this.api.Thongkemonnow().subscribe(
      (data) => {
        console.log(data.totalRevenue)
        console.log(this.totalRevenuemon)
        this.totalRevenuemon = data.totalRevenue;
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    );
  }

  ThongKeYear(): void {
    this.api.Thongkeyearnow().subscribe(
      (data) => {
        console.log(data.totalRevenue)
        console.log(this.totalRevenueyear)
        this.totalRevenueyear = data.totalRevenue;
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      }
    );
  }

  // fetchYearlyRevenue(year: number): void {
  //   this.api.getYearlyRevenue(year).subscribe(
  //     (data) => {
  //       this.totalRevenuechoose = data.totalRevenue;
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //       // Handle errors as needed
  //     }
  //   );
  // }

  // onYearChange(): void {
  //   // Gọi API khi năm được chọn thay đổi
  //   this.fetchYearlyRevenue(this.selectedYear);
  // }
  formatCurrency(price: number | null): string {
    if (price === null) {
      return 'N/A'; // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
    }
  
    // Nhân price với 1000
    const multipliedPrice = price * 1000;
  
    // Định dạng giá trị nhân với 1000
    const formattedPrice = this.decimalPipe.transform(multipliedPrice, '1.0-0');
  
    return formattedPrice ? formattedPrice.replace(/,/g, '.') : '';
  }
  // ngOnInit(): void {
      
  //   this.api.Thongkedaynow().subscribe(res => {
  //     this.subjects = res;
  //     this.totalRevenue = res.totalRevenue;
  //     console.log(this.subjects);
  //   })
  // }
}
