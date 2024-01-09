import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './users/user.component';
import { InhoadonComponent } from './admin/inhoadon/inhoadon.component';
import { LoginComponent } from './admin/login/login.component';

const routes: Routes = [

  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'users',
    component: UserComponent,
    loadChildren: () =>
      import('./users/user.module').then((m) => m.UserModule),
  },

  {
    path: 'hoadon/:id',
    component: InhoadonComponent,
   
  },
  {
    path: 'login',
    component: LoginComponent,
   
  },
  
 
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
