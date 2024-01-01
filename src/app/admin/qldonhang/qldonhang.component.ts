import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qldonhang',
  templateUrl: './qldonhang.component.html',
  // styleUrls: ['./qldonhang.component.css']
  styleUrls: [
    // "../../assets/img/core-img/favicon.ico",
    "../../../assets/vendor/fontawesome-free/css/all.min.css",
    "../../../assets/css/sb-admin-2.min.css",
    "../../../assets/vendor/datatables/dataTables.bootstrap4.min.css",
  ]
})
export class QldonhangComponent {
  constructor(private api : HomeService, private router: Router) {}

  subjects: any;
 
ngOnInit(): void {
      
  this.api.getListdh().subscribe(res => {
    this.subjects = res;
    console.log(this.subjects);
  })
}

redirectToDetailPage(item: any): void {
  // Navigate to the detail page with the product ID
  this.router.navigate(['/admin/chitietdh', item.id]);
}

}
