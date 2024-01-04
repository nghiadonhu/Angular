import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adddatancc',
  templateUrl: './adddatancc.component.html',
  // styleUrls: ['./adddatancc.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
   
  
   
  ]
})
export class AdddatanccComponent {
  constructor(private http: HttpClient,private api : HomeService, private router: Router) {}
  // subjects: any;
  itemData: any = {};
  
  selectedItem: any | null = null;
  subjects: any[] = [];
  
 
  addNewItem(itemData: any): void {
   
    this.api.addItemncc(itemData).subscribe(
      result => {
        console.log('Item added successfully', result);
        this.router.navigate(['/admin/ncc']);
        this.refreshList();
       
      }
    );
  }

  ngOnInit(): void {
    this.api.getListncc().subscribe(res => {
      this.subjects = res;
      console.log(this.subjects);
    });
  }
  



  
  private refreshList(): void {
    this.api.getListncc().subscribe(list => {
      this.subjects = list;
      console.log(this.subjects);
    });
  }
}
