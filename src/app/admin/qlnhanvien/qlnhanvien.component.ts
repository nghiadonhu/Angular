import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qlnhanvien',
  templateUrl: './qlnhanvien.component.html',
  // styleUrls: ['./qlnhanvien.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  
   
  ]
})
export class QlnhanvienComponent implements OnInit{
  constructor(private api : HomeService, private router: Router) {}
    subjects: any;
    selectedItem: any | null = null;
    p: number = 1;
  ngOnInit(): void {
        
    this.api.getListnv().subscribe(res => {
      this.subjects = res;
      console.log(this.subjects);
    })
  }

  removeItem(id: number): void {
    // Hiển thị cửa sổ xác nhận
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa không?');
  
    // Nếu người dùng xác nhận xóa
    if (isConfirmed) {
      this.api.removeItemnv(id).subscribe(res => {
        console.log('Item removed successfully', res);
        this.refreshList();
      });
    }
  }

  // removeItem(id: number): void {
  //   this.api.removeItemnv(id).subscribe(res => {
  //     console.log('Item removed successfully', res);
  //     this.refreshList();
     
  //   }) 
  // }
 
  editItem(id: number,
    Tennhanvien: any,
    Ngaysinh: any,
    Sdt: any,
    Diachi: any,
    Email: any,
   
   
    ): void {
    this.router.navigate(['/admin/editdatanv', id]);
    this.api.editItemnv(id, Tennhanvien,Ngaysinh,Sdt,Diachi,Email).subscribe(
      result => {
        console.log('Item edited successfully', result);
        // You can handle the result as needed
        this.refreshList();
      },
      
    );
  }


  getOneItem(id: number): void {
    this.api.getItemByIdnv(id).subscribe(
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
    // id: number,
    // Tennhanvien: any,
    // Ngaysinh: any,
    // Sdt: any,
    // Diachi: any,
    // Email: any,
    // Anh: any,
    const newItem = {
     
      Tennhanvien: itemData.Tennhanvien || '',
      Ngaysinh: itemData.Ngaysinh || '',
      Sdt: itemData.Sdt || 0,
      Diachi: itemData.Diachi || '',
      Email: itemData.Email || '',
      Anh: itemData.Anh || '',
    };
    this.router.navigate(['/admin/adddatanv']);
    this.api.addItemnv(newItem).subscribe(
      result => {
        console.log('Item added successfully', result);
        // You can handle the result as needed
        this.refreshList();
      }
    );
  }

  private refreshList(): void {
    this.api.getListnv().subscribe(list => {
      this.subjects = list;
      console.log(this.subjects);
    });
  }

}
