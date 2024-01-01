// cart-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';  // Đảm bảo đã import Resolve
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartResolver implements Resolve<any[]> {
  constructor(private cartService: CartService) {}

  resolve(): Observable<any[]> {
    return this.cartService.getCartItems();
  }
}
