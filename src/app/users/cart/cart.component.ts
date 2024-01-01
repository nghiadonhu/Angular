import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    "../../../assets/user/css/core-style.css",
    "../../../assets/user/css/style.css",
    "../../../assets/user/css/responsive.css"
  ]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  i: number = 0; 
  total: number = 0;
  constructor(private cartService: CartService,private router: Router,private decimalPipe: DecimalPipe) {}
  reloadPage(): void {
    this.router.navigate(['/users/index'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users/index']);
    });
  }
  ngOnInit(): void {
    
    this.cartService.getCartItems().subscribe((items: any[]) => {
      this.cartItems = items;
      this.updateTotal();
    });
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.updateTotal();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  private updateTotal(): void {
    this.total = this.cartService.getTotalPrice();
  }
  // increaseQuantity(cartItem: any): void {
  //   cartItem.quantity++;
  //   cartItem.totalPrice = cartItem.Gia * cartItem.quantity;
  //   this.cartService.updateCart();
  //   this.updateTotal();
  // }
  increaseQuantity(cartItem: any): void {
    

    if (cartItem.quantity < cartItem.Soluong) {
        cartItem.quantity++;
        cartItem.totalPrice = cartItem.Gia * cartItem.quantity;
        this.cartService.updateCart();
        this.updateTotal();
    } else {
        // Hiển thị thông báo khi quá số lượng trong kho
        alert('Quá số lượng trong kho!');
    }
}

onQuantityInputChange(cartItem: any): void {
 

  if (cartItem.quantity > cartItem.Soluong) {
      // Hiển thị thông báo khi quá số lượng trong kho
      alert('Quá số lượng trong kho!');
      // Đặt lại giá trị quantity về giới hạn
      cartItem.quantity = cartItem.Soluong;
  }
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

  decreaseQuantity(cartItem: any): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      cartItem.totalPrice = cartItem.Gia * cartItem.quantity;
      this.cartService.updateCart();
      this.updateTotal();
    }
  }
}
