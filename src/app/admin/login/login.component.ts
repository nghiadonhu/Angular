import { Component } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router  } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.css']
  styleUrls: [
  "../../../assets/vendor/fontawesome-free/css/all.min.css",
  "../../../assets/css/sb-admin-2.min.css",
  "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",]
})
export class LoginComponent {
  credentials = { name: '', password: '' };

  constructor(private api: HomeService, private router: Router) {}

  login() {
    this.api.login(this.credentials).subscribe(
      (response) => {
        console.log('Đăng nhập thành công:', response);
        // Lưu token hoặc thực hiện các hành động sau đăng nhập
        this.router.navigate(['/admin/sanpham']);
        alert('Đăng nhập thành công!');

      },
      (error) => {
        console.error('Lỗi đăng nhập:', error);
        alert('Đăng nhập thất bại! Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
      }
    );
  }
}
