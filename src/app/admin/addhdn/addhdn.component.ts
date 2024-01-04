import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addhdn',
  templateUrl: './addhdn.component.html',
  // styleUrls: ['./addhdn.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
   
  
   
  ]
})
export class AddhdnComponent {
  constructor(private http: HttpClient,private api : HomeService, private router: Router) {}
  // subjects: any;
  itemData: any = {};
  
  selectedItem: any | null = null;
  subjects: any[] = [];
  nv: any[] = [];
  ncc: any[] = [];
  selectedNhanvien_id: any;
  selectedNcc_id: any;
  
 
  addNewItem(itemData: any): void {
    
    this.api.addItemhdn(itemData).subscribe(
      result => {
        console.log('Item added successfully', result);
        this.router.navigate(['/admin/hoadonnhap']);
        this.refreshList();
       
      }
    );
  }
 
  ngOnInit(): void {
    this.api.getListhdn().subscribe(res => {
      this.subjects = res;
      console.log(this.subjects);
    });
    this.api.getListnv().subscribe(res => {
      this.nv = res;
      console.log(this.nv);
    });
    this.api.getListncc().subscribe(res => {
      this.ncc = res;
      console.log(this.ncc);
    });
  }
  onNhanvienChange(event: any): void {
    this.selectedNhanvien_id = event.target.value;
  }

  onNccChange(event: any): void {
    this.selectedNcc_id = event.target.value;
  }

 


  
  private refreshList(): void {
    this.api.getListcthdn().subscribe(list => {
      this.subjects = list;
      console.log(this.subjects);
    });
  }
}
