import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suahdn',
  templateUrl: './suahdn.component.html',
  // styleUrls: ['./suahdn.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  
   
  ]
})
export class SuahdnComponent {
  constructor(private api : HomeService, private router: Router, private route: ActivatedRoute) {}
  subjects: any;
  nv: any;
  ncc: any;
  selectedItem: any | null = null;
  
  selectedNcc_id: any;
  selectedNhanvien_id: any;
  category: any = {
    id:0,
    Nhanvien_id: 0,
    Thanhtien: 0,
    Ngaynhap: '',
    Ncc_id: 0
    
    // `id`, `Nhanvien_id`, `Thanhtien`, `Ngaynhap`, `Ncc_id`
  };

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    
    this.api.getItemByIdhdn(id).subscribe((result: any) => {
      this.category = result[0];
      console.log(this.category);
    });

    this.api.getListncc().subscribe(res => {
      this.ncc = res;
      console.log(this.ncc);
    });

    this.api.getListnv().subscribe(res => {
      this.nv = res;
      console.log(this.nv);
    });
  });
}
onNccChange(event: any): void {
  this.selectedNcc_id = event.target.value;
}

onNvChange(event: any): void {
  this.selectedNhanvien_id = event.target.value;
}

editItemhdn(id: number,
  Nhanvien_id: number,
  Thanhtien: any,
  Ngaynhap: any,
  Ncc_id: number): void {
  this.router.navigate(['/editdatahdn', id]);
  this.api.editItemhdn(id, Nhanvien_id,Thanhtien,Ngaynhap,Ncc_id).subscribe(
    result => {
      console.log('Item edited successfully', result);
     
      this.refreshList();
      this.router.navigate(['/admin/hoadonnhap']);
    },
   
  );
}


private refreshList(): void {
  this.api.getList().subscribe(list => {
    this.subjects = list;
    console.log(this.subjects);
  });
}
}
