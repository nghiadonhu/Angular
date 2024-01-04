import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Datap1Component } from './datap1/datap1.component';
import { NewComponent } from './new/new.component';
import { AdddataComponent } from './adddata/adddata.component';
import { QlsanphamComponent } from './qlsanpham/qlsanpham.component';
import { AddataspComponent } from './addatasp/addatasp.component';
import { SuasanphamComponent } from './suasanpham/suasanpham.component';
import { QldonhangComponent } from './qldonhang/qldonhang.component';
import { QlctdhComponent } from './qlctdh/qlctdh.component';
import { QlcthdnComponent } from './qlcthdn/qlcthdn.component';
import { AddcthdnComponent } from './addcthdn/addcthdn.component';
import { QlhdnComponent } from './qlhdn/qlhdn.component';
import { AddhdnComponent } from './addhdn/addhdn.component';
import { SuahdnComponent } from './suahdn/suahdn.component';
import { QlnccComponent } from './qlncc/qlncc.component';
import { AdddatanccComponent } from './adddatancc/adddatancc.component';
import { SuanccComponent } from './suancc/suancc.component';
import { QlnhanvienComponent } from './qlnhanvien/qlnhanvien.component';
import { AdddatanvComponent } from './adddatanv/adddatanv.component';
import { SuanvComponent } from './suanv/suanv.component';
import { QlkhComponent } from './qlkh/qlkh.component';
import { AdddatakhComponent } from './adddatakh/adddatakh.component';
import { SuakhComponent } from './suakh/suakh.component';

const routes: Routes = [

  
  {
    path:'sanpham',
    component:QlsanphamComponent
  },
  {
    path:'ncc',
    component:QlnccComponent
  },
  {
    path:'khachhang',
    component:QlkhComponent
  },

  {
    path:'nv',
    component:QlnhanvienComponent
  },

  {
    path:'data1',
    component:Datap1Component
  },

  {
    path:'adddatanv',
    component:AdddatanvComponent
  },
  {
    path:'adddata',
    component:AdddataComponent
  },
  {
    path:'adddatakh',
    component:AdddatakhComponent
  },
  {
    path:'adddatasp',
    component:AddataspComponent
  },

  {
    path:'adddatacthdn',
    component:AddcthdnComponent
  },
  {
    path:'adddatancc',
    component:AdddatanccComponent
  },

  {
    path:'adddatahdn',
    component:AddhdnComponent
  },

  {
    path:'hoadonnhap',
    component:QlhdnComponent
  },
  // {
  //   path:'editdata/:id',
  //   component:Datap1Component
  // },
  {
    path:'editdatancc/:id',
    component:SuanccComponent
  },
  
  {
    path:'editdata/:id',
    component:NewComponent
  },

  {
    path:'editdatakh/:id',
    component:SuakhComponent
  },

  {
    path:'editdatanv/:id',
    component:SuanvComponent
  },
  {
    path:'editdatasp/:id',
    component:SuasanphamComponent
  },
  {
    path:'editdatahdn/:id',
    component:SuahdnComponent
  },
  {
    path:'donhang',
    component:QldonhangComponent
  },
  {
    path:'chitietdh/:id',
    component:QlctdhComponent
  },
  {
    path:'chitiethdn/:id',
    component:QlcthdnComponent
  },

];

@NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
