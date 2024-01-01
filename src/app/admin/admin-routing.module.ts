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


const routes: Routes = [

  
  {
    path:'sanpham',
    component:QlsanphamComponent
  },

  {
    path:'data1',
    component:Datap1Component
  },
  {
    path:'adddata',
    component:AdddataComponent
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
    path:'editdata/:id',
    component:NewComponent
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
