import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router  } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-qlcthdn',
  templateUrl: './qlcthdn.component.html',
  // styleUrls: ['./qlcthdn.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  ]
})
export class QlcthdnComponent implements OnInit {
  product: any;
  productId: any;
  p: number = 1;
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private decimalPipe: DecimalPipe,private route: ActivatedRoute, private homeService: HomeService) {
    //Lấy thông tin sản phẩm từ trạng thái router
    // const navigation = this.router.getCurrentNavigation();
    
    // this.product = navigation?.extras.state?.['product'];
  }

  ngOnInit(): void {
    // Lấy id từ URL
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
console.log(this.productId)
      // Gọi service để lấy chi tiết sản phẩm
      this.homeService.getItemByIdcthdn(this.productId).subscribe(
        (data) => {
          this.product = data;
          console.log(this.product)
          // Có thể thực hiện các hành động khác tại đây nếu cần
        },
        (error) => {
          console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        }
      );
    });
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
}
