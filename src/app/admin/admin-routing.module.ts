import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Datap1Component } from './datap1/datap1.component';
import { NewComponent } from './new/new.component';
import { AdddataComponent } from './adddata/adddata.component';
import { QlsanphamComponent } from './qlsanpham/qlsanpham.component';
import { AddataspComponent } from './addatasp/addatasp.component';
import { SuasanphamComponent } from './suasanpham/suasanpham.component';


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
  }

];

@NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminRoutingModule { }
