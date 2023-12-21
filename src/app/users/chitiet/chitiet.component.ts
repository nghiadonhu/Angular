import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router  } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { HomeService } from '../service/home.service';
@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  // styleUrls: ['./chitiet.component.css']
  styleUrls: [
    "../../../assets/user/css/core-style.css",
    "../../../assets/user/css/style.css",
    "../../../assets/user/css/responsive.css"
  ]
})
export class ChitietComponent implements OnInit  {
  product: any;
  productId: any;
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
      this.homeService.getItemByIdsp(this.productId).subscribe(
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
