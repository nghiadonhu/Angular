import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { CurrencyPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/user/css/core-style.css",
    "../../../assets/user/css/style.css",
    "../../../assets/user/css/responsive.css"

  ]
  // styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit  {
  constructor(private api : HomeService, private router: Router,private cartService: CartService,private currencyPipe: CurrencyPipe,private decimalPipe: DecimalPipe,  private route: ActivatedRoute,) {}
  subjects: any;
  products: any;
  selectedItem: any | null = null;
  categoryId!: any;
ngOnInit(): void {
      
  this.api.getListloai().subscribe(res => {
    this.subjects = res;
    console.log(this.subjects);
  });

  this.api.getList().subscribe(res => {
    this.products = res;
    console.log(this.products);
  })
  
}

redirectToDetailPage(item: any): void {
  // Navigate to the detail page with the product ID
  this.router.navigate(['/users/chitiet', item.id]);
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
onCategoryClick(event: Event, categoryId: any) {
  // Ngăn chặn sự kiện mặc định của thẻ 'a' để không làm mất hiệu ứng collapse
  event.preventDefault();

  
  console.log('Category ID:', categoryId);

  // Gọi API hoặc thực hiện các công việc khác dựa trên categoryId
  this.api.getlistByIdsp(categoryId).subscribe(
    (data) => {
      this.products = data;
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
  );
}
}
