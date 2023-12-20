import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adddata',
  templateUrl: './adddata.component.html',
  styleUrls: ['./adddata.component.css']
})
export class AdddataComponent {
  constructor(private api : HomeService, private router: Router) {}
  subjects: any;
  selectedItem: any | null = null;
 
  addNewItem(Tenloai: string): void {
    
    this.api.addItem(Tenloai).subscribe(
      result => {
        console.log('Item added successfully', result);
        // You can handle the result as needed
        this.refreshList();
        this.router.navigate(['/admin/data1']);
      }
    );
  }
  private refreshList(): void {
    this.api.getList().subscribe(list => {
      this.subjects = list;
      console.log(this.subjects);
    });
  }
}
