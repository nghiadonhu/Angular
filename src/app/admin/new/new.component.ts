import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  // styleUrls: ['./new.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  
   
  ]
})
export class NewComponent implements OnInit{
  constructor(private api : HomeService, private router: Router, private route: ActivatedRoute) {}
    subjects: any;
    selectedItem: any | null = null;

    category: any = {
      id: 0,
      Tenloai: ''
    };
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      this.api.getItemById(id).subscribe((result: any) => {
        this.category = result[0];
        console.log(this.category);
      });
    });
    
  }

  

  // removeItem(id: number): void {
  //   this.api.removeItem(id).subscribe(res => {
  //     console.log('Item removed successfully', res);
  //     this.refreshList();
      
  //   }) 
  // }

  editItem(id: number, Tenloai: string): void {
    this.router.navigate(['/admin/editdata', id]);
    this.api.editItem(id, Tenloai).subscribe(
      result => {
        console.log('Item edited successfully', result);
        // You can handle the result as needed
        this.refreshList();
        this.router.navigate(['/admin/data1']);
      },
     
    );
  }


  // getOneItem(id: number): void {
  //   this.api.getItemById(id).subscribe(
  //     result => {
  //       console.log('Item details retrieved successfully', result);
  //       this.selectedItem = result;
  //     },
  //     error => {
  //       console.error('Error retrieving item details', error);
  //     }
  //   );
  // }

 

  private refreshList(): void {
    this.api.getList().subscribe(list => {
      this.subjects = list;
      console.log(this.subjects);
    });
  }

}