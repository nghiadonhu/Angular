import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
  }

  increaseQuantity(cartItem: any): void {
    cartItem.quantity++;
    cartItem.totalPrice = cartItem.Gia * cartItem.quantity;
    this.cartService.updateCart();
  }

  decreaseQuantity(cartItem: any): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      cartItem.totalPrice = cartItem.Gia * cartItem.quantity;
      this.cartService.updateCart();
    }
  }
}
