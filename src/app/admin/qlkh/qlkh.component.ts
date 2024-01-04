import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qlkh',
  templateUrl: './qlkh.component.html',
  // styleUrls: ['./qlkh.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  
   
  ]
})
export class QlkhComponent implements OnInit{
  constructor(private api : HomeService, private router: Router) {}
    subjects: any;
    selectedItem: any | null = null;
    p: number = 1;
  ngOnInit(): void {
        
    this.api.getListkh().subscribe(res => {
      this.subjects = res;
      console.log(this.subjects);
    })
  }

  removeItem(id: number): void {
    // Hiển thị cửa sổ xác nhận
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa không?');
  
    // Nếu người dùng xác nhận xóa
    if (isConfirmed) {
      this.api.removeItemkh(id).subscribe(res => {
        console.log('Item removed successfully', res);
        this.refreshList();
      });
    }
  }

  // removeItem(id: number): void {
  //   this.api.removeItemkh(id).subscribe(res => {
  //     console.log('Item removed successfully', res);
  //     this.refreshList();
  //   }) 
  // }
 
  editItem(id: number,
    Tenkhachhang: any,
    Ngaysinh: any,
    Sdt: any,
    Diachi: any,
    Email: any,): void {
    this.router.navigate(['/admin/editdatakh', id]);
    this.api.editItemkh(id, Tenkhachhang,Ngaysinh,Sdt,Diachi,Email).subscribe(
      result => {
        console.log('Item edited successfully', result);
        // You can handle the result as needed
        this.refreshList();
      },
      
    );
  }


  getOneItem(id: number): void {
    this.api.getItemById(id).subscribe(
      result => {
        console.log('Item details retrieved successfully', result);
        this.selectedItem = result;
      },
      error => {
        console.error('Error retrieving item details', error);
      }
    );
  }

  addNewItem(itemData: any): void {
    
    const newItem = {
    //   Tenkhachhang: any,
    // Ngaysinh: any,
    // Sdt: any,
    // Diachi: any,
    // Email: any
      Tenkhachhang: itemData.Tenkhachhang || '',
      Ngaysinh: itemData.Ngaysinh || '',
      Sdt: itemData.Sdt || 0,
      Diachi: itemData.Diachi || '',
      Email: itemData.Email || '',
    };
    this.router.navigate(['/admin/adddatakh']);
    this.api.addItemncc(newItem).subscribe(
      result => {
        console.log('Item added successfully', result);
        // You can handle the result as needed
        this.refreshList();
      }
    );
  }

  private refreshList(): void {
    this.api.getListkh().subscribe(list => {
      this.subjects = list;
      console.log(this.subjects);
    });
  }

}
