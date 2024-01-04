import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  cartItemsSubject: BehaviorSubject<any[]>;

  constructor(private snackBar: MatSnackBar) {
    const storedCart = localStorage.getItem('cart');
    this.cartItemsSubject = new BehaviorSubject<any[]>(JSON.parse(storedCart || '[]'));
  }
  

  addToCart(item: any): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(cartItem => cartItem.id === item.id);
  
    if (existingItem) {
      // Sản phẩm đã tồn tại trong giỏ, cộng thêm 1 vào số lượng
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.Gia * existingItem.quantity;
      this.showSuccessNotification('Sản phẩm đã được thêm vào giỏ hàng');
    } else {
      // Sản phẩm chưa có trong giỏ, thêm mới vào giỏ
      const updatedItems = [...currentItems, { ...item, quantity: 1, totalPrice: item.Gia }];
      
      this.cartItemsSubject.next(updatedItems);
      this.showSuccessNotification('Sản phẩm đã được thêm vào giỏ hàng');
    }
  
    // Cập nhật giỏ hàng
    this.updateCart();
  }
  


  showSuccessNotification(message: string): void {
    // Ở đây, bạn có thể sử dụng một thư viện thông báo hoặc hiển thị thông báo theo cách bạn muốn
    // Ví dụ sử dụng Angular Material Snackbar:
    this.snackBar.open(message, 'Đóng', {
      duration: 2000, // Thời gian hiển thị thông báo
      verticalPosition: 'top', // Vị trí của thông báo
    });
  }



  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  getTotalPrice(): number {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.reduce((total, item) => total + item.totalPrice, 0);
  }

//   removeFromCart(index: number): void {
//     const currentItems = this.cartItemsSubject.value;
//     const updatedItems = currentItems.filter((_, i) => i !== index);
//     this.cartItemsSubject.next(updatedItems);
//     this.updateCart();
//   }
removeFromCart(index: number): void {
    console.log('Before removing:', this.cartItemsSubject.value);
  
    const currentItems = this.cartItemsSubject.value;
  
    if (index >= 0 && index < currentItems.length) {
      const updatedItems = currentItems.filter((_, i) => i !== index);
  
      console.log('After removing:', updatedItems);
  
      this.cartItemsSubject.next(updatedItems);
      this.updateCart();
  
      // Cập nhật LocalStorage
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    } else {
      console.error('Invalid index for removeFromCart:', index);
    }
  }
  
  clearCart(): void {
    // Clear the cart items
    this.cartItemsSubject.next([]);
  
    // Update LocalStorage
    localStorage.removeItem('cart');
  }
  getTotalQuantity(): number {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.reduce((total, item) => total + item.quantity, 0);
  }
  
  

  updateCart(): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.map((item) => ({
      ...item,
      totalPrice: item.Gia * item.quantity,
    }));
    this.cartItemsSubject.next(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  }
}
