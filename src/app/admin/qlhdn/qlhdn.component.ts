import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router  } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-qlhdn',
  templateUrl: './qlhdn.component.html',
  // styleUrls: ['./qlhdn.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  ]
})
export class QlhdnComponent {
  constructor(private api : HomeService, private router: Router,private decimalPipe: DecimalPipe) {}
  
  subjects: any;
  selectedItem: any | null = null;
  selectedNhanvien_id: any;
  selectedNcc_id: any;
  p: number = 1;
ngOnInit(): void {
      
  this.api.getListhdn().subscribe(res => {
    this.subjects = res;
    console.log(this.subjects);
  })
}

removeItemhdn(id: number): void {
  // Hiển thị cửa sổ xác nhận
  const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa không?');

  // Nếu người dùng xác nhận xóa
  if (isConfirmed) {
    this.api.removeItemhdn(id).subscribe(res => {
      console.log('Item removed successfully', res);
      this.refreshList();
    });
  }
}

// removeItemhdn(id: number): void {
//   this.api.removeItemhdn(id).subscribe(res => {
//     console.log('Item removed successfully', res);
//     this.refreshList();
//   }) 
// }



editItemhdn(id: number,
  Nhanvien_id: number,
  Thanhtien: any,
  Ngaynhap: any,
  Ncc_id: number
 ): void {
  this.router.navigate(['/admin/editdatahdn', id]);
  this.api.editItemhdn(id, Nhanvien_id, Thanhtien, Ngaynhap, Ncc_id).subscribe(
    result => {
      console.log('Item edited successfully', result);
    
      this.refreshList();
    },
    
  );
}


getOneItemsp(id: number): void {
  this.api.getItemByIdsp(id).subscribe(
    result => {
      console.log('Item details retrieved successfully', result);
      this.selectedItem = result;
    },
    error => {
      console.error('Error retrieving item details', error);
    }
  );
}
// SELECT `id`, `Nhanvien_id`, `Thanhtien`, `Ngaynhap`, `Ncc_id`,
addNewItem(itemData: any): void {
  const newItem = {
    Nhanvien_id: this.selectedNhanvien_id || '',
    
    Thanhtien: itemData.Thanhtien || 0,
    Ngaynhap: itemData.Ngaynhap || '',
    Ncc_id: this.selectedNcc_id || '',
   
  };

  this.api.addItemhdn(newItem).subscribe(
    result => {
      console.log('Item added successfully', result);
      // Sau khi thêm thành công, chuyển hướng đến trang adddata
      this.router.navigate(['/admin/adddata']);
      // Cập nhật danh sách nếu cần thiết
      this.refreshList();
    }
  );
}



redirectToDetailPage(item: any): void {
  // Navigate to the detail page with the product ID
  this.router.navigate(['/admin/chitiethdn', item.id]);
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


private refreshList(): void {
  this.api.getListhdn().subscribe(list => {
    this.subjects = list;
    console.log(this.subjects);
  });
}
}
