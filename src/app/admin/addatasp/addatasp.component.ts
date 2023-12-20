import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addatasp',
  templateUrl: './addatasp.component.html',
  styleUrls: ['./addatasp.component.css']
})
export class AddataspComponent {
  constructor(private api : HomeService, private router: Router) {}
  // subjects: any;
  selectedFile: any;
  selectedItem: any | null = null;
  subjects: any[] = [];
  selectedMaloai_id: any;
 
  addNewItem(itemData: any): void {
    
    this.api.addItemsp(itemData).subscribe(
      result => {
        console.log('Item added successfully', result);
        // You can handle the result as needed
        this.refreshList();
        // this.router.navigate(['/admin/sanpham']);
      }
    );
  }
  ngOnInit(): void {
    this.api.getList().subscribe(res => {
      this.subjects = res;
      console.log(this.subjects);
    });
  }
  onMaloaiChange(event: any): void {
    this.selectedMaloai_id = event.target.value;
  }

  onFileSelected(event: any): void {
    // Xử lý sự kiện khi người dùng chọn một file
    this.selectedFile = event.target.files[0];
  }
  
  uploadFile(): void {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
  
    this.api.upload(this.selectedFile).subscribe(
      (response: any) => {
        console.log('File uploaded successfully:', response);
        // Xử lý phản hồi từ máy chủ
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
