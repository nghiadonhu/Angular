import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qlsanpham',
  templateUrl: './qlsanpham.component.html',
  styleUrls: ['./qlsanpham.component.css']
})
export class QlsanphamComponent {
  constructor(private api : HomeService, private router: Router) {}
  
  subjects: any;
  selectedItem: any | null = null;
  selectedMaloai_id: any;
ngOnInit(): void {
      
  this.api.getListsp().subscribe(res => {
    this.subjects = res;
    console.log(this.subjects);
  })
}



removeItemsp(id: number): void {
  this.api.removeItemsp(id).subscribe(res => {
    console.log('Item removed successfully', res);
    this.refreshList();
    // this.api.getList().subscribe(list => {
    //   this.subjects = list;
    //   console.log(this.subjects);

    // },
    

    //)
  }) 
}



editItemsp(id: number,
  Maloai_id: number,
  Tensanpham: any,
  Anh: any,
  Soluong: any,
  Gia: any,
  Maluc: any,
  PhanKhuc: any,
  VongTuaMay: any,
  MoMenXoan: any,
  Giakhuyenmai: any,
  ViewCount: any,
  ReducePrice: any): void {
  this.router.navigate(['/admin/editdatasp', id]);
  this.api.editItemsp(id, Maloai_id, Tensanpham, Anh, Soluong, Gia, Maluc, PhanKhuc, VongTuaMay, MoMenXoan, Giakhuyenmai, ViewCount, ReducePrice).subscribe(
    result => {
      console.log('Item edited successfully', result);
      // You can handle the result as needed
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
//  `id`, `Maloai_id`, `Tensanpham`, `Anh`, `Soluong`, `Gia`, `Maluc`, `PhanKhuc`, `VongTuaMay`, `MoMenXoan`, `Giakhuyenmai`, `ViewCount`, `ReducePrice` 
addNewItem(itemData: any): void {
  const newItem = {
    Maloai_id: this.selectedMaloai_id || '',
    Tensanpham: itemData.Tensanpham || '',
    Anh: itemData.Anh || '',
    Soluong: itemData.Soluong || 0,
    Gia: itemData.Gia || 0,
    Maluc: itemData.Maluc || '',
    PhanKhuc: itemData.PhanKhuc || '',
    VongTuaMay: itemData.VongTuaMay || '',
    MoMenXoan: itemData.MoMenXoan || '',
    Giakhuyenmai: itemData.Giakhuyenmai || 0,
    ViewCount: itemData.ViewCount || 0,
    ReducePrice: itemData.ReducePrice || 0,
  };

  this.api.addItemsp(newItem).subscribe(
    result => {
      console.log('Item added successfully', result);
      // Sau khi thêm thành công, chuyển hướng đến trang adddata
      this.router.navigate(['/admin/adddata']);
      // Cập nhật danh sách nếu cần thiết
      this.refreshList();
    }
  );
}


private refreshList(): void {
  this.api.getListsp().subscribe(list => {
    this.subjects = list;
    console.log(this.subjects);
  });
}
}
