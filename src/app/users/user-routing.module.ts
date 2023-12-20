import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ChitietComponent } from './chitiet/chitiet.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TintucComponent } from './tintuc/tintuc.component';

const routes: Routes = [

  {
    path:'index',
    component:IndexComponent
  },
  {
    path:'chitiet',
    component:ChitietComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'shop',
    component:ShopComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'tintuc',
    component:TintucComponent
  }


];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  // exports: [RouterModule]
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { 

  
}
