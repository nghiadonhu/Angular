import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { HomeService } from '../service/home.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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

  constructor(private cartService: CartService, private homeService: HomeService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Tạo orderForm trước khi gọi service để lấy dữ liệu từ cart
    this.orderForm = this.formBuilder.group({
      Hoten: ['', Validators.required],
      Diachi: ['', Validators.required],
      Sdt: ['', [Validators.required, Validators.min(0)]],
      Email: ['', [Validators.required, Validators.email]],
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
      Soluong: [item.Soluong, [Validators.required, Validators.min(0)]],
      Gia: [item.Gia, [Validators.required, Validators.min(0)]],
      Tongtien: [100000], // Bạn có thể thêm validators nếu cần
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
        // Thực hiện các hành động sau khi tạo đơn hàng thành công
      },
      (error) => {
        console.error('Lỗi khi tạo đơn hàng:', error);
        // Xử lý lỗi
      }
    );
  }

  private updateTotal(): void {
    // Tính tổng giá trị từ cart service
    this.total = this.cartService.getTotalPrice();
  }
}
