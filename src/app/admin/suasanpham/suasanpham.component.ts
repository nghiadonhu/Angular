import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suasanpham',
  templateUrl: './suasanpham.component.html',
  styleUrls: ['./suasanpham.component.css']
})
export class SuasanphamComponent implements OnInit {
  constructor(private api : HomeService, private router: Router, private route: ActivatedRoute) {}
  subjects: any;
  selectedItem: any | null = null;
  
  selectedMaloai_id: any;
  category: any = {
    id:0,
    Maloai_id: 0,
    Tensanpham: '',
    Anh: '',
    Soluong: 0,
    Gia: 0,
    Maluc: '',
    PhanKhuc: '',
    VongTuaMay: '',
    MoMenXoan: '',
    Giakhuyenmai: 0,
    ViewCount: 0,
    ReducePrice: 0
  };

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    
    this.api.getItemByIdsp(id).subscribe((result: any) => {
      this.category = result[0];
      console.log(this.category);
    });

    this.api.getList().subscribe(res => {
      this.subjects = res;
      console.log(this.subjects);
    });
  });
  
}
onMaloaiChange(event: any): void {
  this.selectedMaloai_id = event.target.value;
}


// removeItem(id: number): void {
//   this.api.removeItem(id).subscribe(res => {
//     console.log('Item removed successfully', res);
//     this.refreshList();
    
//   }) 
// }
editItemsp(id: number,
  Maloai_id: number,
  Tensanpham: any,
  Anh: any,
  Soluong: any,
  Gia: any,
  Maluc: any,
  PhanKhuc: any,
  VongTuaMay: any,
  MoMenXoan: any,
  Giakhuyenmai: any,
  ViewCount: any,
  ReducePrice: any): void {
  this.router.navigate(['/editdatasp', id]);
  this.api.editItemsp(id, Maloai_id,Tensanpham,Anh,Soluong,Gia,Maluc,PhanKhuc,VongTuaMay,MoMenXoan,Giakhuyenmai,ViewCount,ReducePrice).subscribe(
    result => {
      console.log('Item edited successfully', result);
     
      this.refreshList();
      this.router.navigate(['/sanpham']);
    },
   
  );
}
// editItemsp(
//   id: number,
//   Maloai_id: number,
//   Tensanpham: any,
//   Anh: any,
//   Soluong: any,
//   Gia: any,
//   Maluc: any,
//   PhanKhuc: any,
//   VongTuaMay: any,
//   MoMenXoan: any,
//   Giakhuyenmai: any,
//   ViewCount: any,
//   ReducePrice: any
// ): void {
  

//   this.api.editItemsp(
//     id,
//     Maloai_id,
//     Tensanpham,
//     Anh,
//     Soluong,
//     Gia,
//     Maluc,
//     PhanKhuc,
//     VongTuaMay,
//     MoMenXoan,
//     Giakhuyenmai,
//     ViewCount,
//     ReducePrice
//   ).subscribe(
//     result => {
//       console.log('Item edited successfully', result);
     
//       this.refreshList();
    
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
