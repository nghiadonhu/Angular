import { Component } from '@angular/core';

import { Router  } from '@angular/router';

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css']
})
export class ChitietComponent  {
  product: any;

  constructor(private router: Router) {
    // Lấy thông tin sản phẩm từ trạng thái router
    const navigation = this.router.getCurrentNavigation();
    
    this.product = navigation?.extras.state?.['product'];
  }
  
  
  
}
