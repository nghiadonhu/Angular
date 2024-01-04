import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-suanv',
  templateUrl: './suanv.component.html',
  // styleUrls: ['./suanv.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  
   
  ]
})
export class SuanvComponent implements OnInit {
  constructor(private http: HttpClient,private api : HomeService, private router: Router, private route: ActivatedRoute) {}
  subjects: any;
  selectedItem: any | null = null;
  
  category: any = {
    
    id:0,
    Tennhanvien: '',
    Ngaysinh: '',
    Sdt: 0,
   Diachi : '',
   Email : ''
   
  };

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    
    this.api.getItemByIdnv(id).subscribe((result: any) => {
      this.category = result[0];
      console.log(this.category);
    });

    this.api.getListnv().subscribe(res => {
      this.subjects = res;
      console.log(this.subjects);
    });
  });
  
}


editItem(id: number,
  Tennhanvien: any,
  Ngaysinh: any,
  Sdt: number,
 Diachi : any,
 Email : any,): void {
  this.router.navigate(['/admin/editdata', id]);
  this.api.editItemnv(id, Tennhanvien,Ngaysinh,Sdt,Diachi,Email).subscribe(
    result => {
      console.log('Item edited successfully', result);
      // You can handle the result as needed
      this.refreshList();
      this.router.navigate(['/admin/nv']);
    },
    
  );
}

private refreshList(): void {
  this.api.getListnv().subscribe(list => {
    this.subjects = list;
    console.log(this.subjects);
  });
}
}

