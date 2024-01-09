import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-qldonhang',
  templateUrl: './qldonhang.component.html',
  // styleUrls: ['./qldonhang.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  ]
})
export class QldonhangComponent {
  constructor(private api : HomeService, private router: Router,private decimalPipe: DecimalPipe) {}

  subjects: any;
  p: number = 1;
ngOnInit(): void {
      
  this.api.getListdh().subscribe(res => {
    this.subjects = res;
    console.log(this.subjects);
  })
}

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

removeItemdh(id: number): void {
  // Hiển thị cửa sổ xác nhận
  const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa không?');

  // Nếu người dùng xác nhận xóa
  if (isConfirmed) {
    this.api.removeItemdh(id).subscribe(res => {
      console.log('Item removed successfully', res);
      this.refreshList();
    });
  }
}

redirectToDetailPage(item: any): void {
  // Navigate to the detail page with the product ID
  this.router.navigate(['/admin/chitietdh', item.id]);
}

redirectToInHoaDon(item: any): void {
  // Navigate to the detail page with the product ID
  this.router.navigate(['/hoadon', item.id]);
}

private refreshList(): void {
  this.api.getListdh().subscribe(list => {
    this.subjects = list;
    console.log(this.subjects);
  });
}
}
