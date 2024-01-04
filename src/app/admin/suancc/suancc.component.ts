import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-suancc',
  templateUrl: './suancc.component.html',
  // styleUrls: ['./suancc.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  
   
  ]
})
export class SuanccComponent implements OnInit {
  constructor(private http: HttpClient,private api : HomeService, private router: Router, private route: ActivatedRoute) {}
  subjects: any;
  selectedItem: any | null = null;
  
  category: any = {
    id:0,
    Tenncc: '',
    Diachi: '',
    Sdt: 0,
    
  };

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    
    this.api.getItemByIdncc(id).subscribe((result: any) => {
      this.category = result[0];
      console.log(this.category);
    });

    this.api.getListncc().subscribe(res => {
      this.subjects = res;
      console.log(this.subjects);
    });
  });
  
}


editItem(id: number,
  Tenncc: any,
  Diachi: any,
  Sdt: any,): void {
  this.router.navigate(['/admin/editdata', id]);
  this.api.editItemncc(id, Tenncc,Diachi,Sdt).subscribe(
    result => {
      console.log('Item edited successfully', result);
      // You can handle the result as needed
      this.refreshList();
      this.router.navigate(['/admin/ncc']);
    },
    
  );
}

private refreshList(): void {
  this.api.getListncc().subscribe(list => {
    this.subjects = list;
    console.log(this.subjects);
  });
}
}

