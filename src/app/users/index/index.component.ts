import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [CartService],
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/user/css/core-style.css",
    "../../../assets/user/css/style.css",
    "../../../assets/user/css/responsive.css"
  ]
})

export class IndexComponent implements OnInit {
  constructor(private api : HomeService, private router: Router,private cartService: CartService) {}
  subjects: any;
  selectedItem: any | null = null;

ngOnInit(): void {
      
  this.api.getList().subscribe(res => {
    this.subjects = res;
    console.log(this.subjects);
  })
}
addToCart(item: any): void {
  console.log('Adding to cart:', item);
  this.cartService.addToCart(item);
}
redirectToDetailPage(item: any): void {
  // Navigate to the detail page with the product information
  this.router.navigate(['/users/chitiet'], { state: { product: item } });
  
}



}
