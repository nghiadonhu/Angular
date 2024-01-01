import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { HomeService } from '../service/home.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [
    "../../../assets/user/css/core-style.css",
    "../../../assets/user/css/style.css",
    "../../../assets/user/css/responsive.css"
  ]
})
export class CheckoutComponent implements OnInit {
  orderForm!: FormGroup;
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private homeService: HomeService, private formBuilder: FormBuilder,private router: Router,private decimalPipe: DecimalPipe) {}

  ngOnInit(): void {
    // Tạo orderForm trước khi gọi service để lấy dữ liệu từ cart
    this.orderForm = this.formBuilder.group({
      Hoten: ['', Validators.required],
      Diachi: ['', Validators.required],
      Ngaydat: [new Date(), Validators.required],
      Sdt: ['', [Validators.required, Validators.min(0)]],
      Email: ['', [Validators.required, Validators.email]],
      Tongtien: [this.cartService.getTotalPrice(), Validators.required], 
      Sanphamjson: this.formBuilder.array([]),
    });


    
    // Gọi service để lấy dữ liệu từ cart
    this.cartService.getCartItems().subscribe((items: any[]) => {
      this.cartItems = items;
      this.updateTotal();

      // Tự động gán các trường từ cartItems vào sanphamjson
      const sanphamjsonControls = this.cartItems.map(item => this.createSanphamGroup(item));
      this.orderForm.setControl('Sanphamjson', this.formBuilder.array(sanphamjsonControls));
    });
  }



  get sanphamjson(): FormArray {
    return this.orderForm.get('Sanphamjson') as FormArray;
  }

  addSanpham(item: any): void {
    this.sanphamjson.push(this.createSanphamGroup(item));
  }

  private createSanphamGroup(item: any): FormGroup {
    return this.formBuilder.group({
      Sanpham_id: [item.id, Validators.required],
      Tensanpham: [item.Tensanpham, Validators.required],
      Anh: [item.Anh], // Thêm thông tin hình ảnh nếu có
      Soluong: [item.quantity, [Validators.required, Validators.min(0)]],
      Gia: [item.Gia, [Validators.required, Validators.min(0)]],
      Tongtien: [item.Gia* item.quantity], // Bạn có thể thêm validators nếu cần
    });
  }

  submitOrder(): void {
    console.log('Form value:', this.orderForm.value);
    if (this.orderForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const orderData = this.orderForm.value;
    try {
      // Check if orderData.sanphamjson is already a string
      orderData.sanphamjson = typeof orderData.sanphamjson === 'string'
        ? JSON.parse(orderData.sanphamjson)
        : orderData.sanphamjson;
    } catch (error) {
      // Handle the parsing error
      console.error('Error parsing orderData.sanphamjson:', error);
      // You might want to throw an error or handle it in an appropriate way
      return;
    }

    this.homeService.createOrder(orderData).subscribe(
      (response) => {
        console.log('Đơn hàng đã được tạo:', response);
        this.cartService.clearCart();
        this.router.navigate(['/users/index']);
        // Thực hiện các hành động sau khi tạo đơn hàng thành công
      },
      (error) => {
        console.error('Lỗi khi tạo đơn hàng:', error);
        // Xử lý lỗi
      }
    );
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
  
  private updateTotal(): void {
    // Tính tổng giá trị từ cart service
    this.total = this.cartService.getTotalPrice();
  }
}
