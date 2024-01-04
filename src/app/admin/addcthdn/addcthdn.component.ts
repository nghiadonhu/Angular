import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addcthdn',
  templateUrl: './addcthdn.component.html',
//   styleUrls: ['./addcthdn.component.css']
styleUrls: [
  // "../../assets/img/core-img/favicon.ico",
  "../../../assets/vendor/fontawesome-free/css/all.min.css",
  "../../../assets/css/sb-admin-2.min.css",
  "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
]
})
export class AddcthdnComponent {
  constructor(private http: HttpClient,private api : HomeService, private router: Router) {}
  // subjects: any;
  itemData: any = {};
  
  selectedItem: any | null = null;
  subjects: any[] = [];
  hdn: any[] = [];
  sp: any[] = [];
  selectedHoadonnhap_id: any;
  selectedSanpham_id: any;
  
 
  addNewItem(itemData: any): void {
    
    this.api.addItemcthdn(itemData).subscribe(
      result => {
        console.log('Item added successfully', result);
        this.router.navigate(['/admin/hoadonnhap']);
        this.refreshList();
       
      }
    );
  }
 
  ngOnInit(): void {
    this.api.getListcthdn().subscribe(res => {
      this.subjects = res;
      console.log(this.subjects);
    });
    this.api.getListhdn().subscribe(res => {
      this.hdn = res;
      console.log(this.hdn);
    });
    this.api.getListsp().subscribe(res => {
      this.sp = res;
      console.log(this.sp);
    });
  }
  onHoadonnhapChange(event: any): void {
    this.selectedHoadonnhap_id = event.target.value;
  }

  onSanphamChange(event: any): void {
    this.selectedSanpham_id = event.target.value;
  }

 


  
  private refreshList(): void {
    this.api.getListcthdn().subscribe(list => {
      this.subjects = list;
      console.log(this.subjects);
    });
  }
}
