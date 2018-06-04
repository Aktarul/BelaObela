import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { AuthGaurd} from "./gaurds/auth.gaurd";
import { ProductComponent} from "./components/product/product.component";
import { PhotoUploadComponent } from "./components/photo-upload/photo-upload.component";
import {CartComponent} from "./components/cart/cart.component";
import {AdminGaurd} from "./gaurds/admin.gaurd";
import {DetailsComponent} from "./components/details/details.component";
import {EditproductComponent} from "./components/editproduct/editproduct.component";
import {EditprofileComponent} from "./components/editprofile/editprofile.component";
import { AboutContactComponent } from "./components/about-contact/about-contact.component";
import {LoginRegisterComponent} from "./components/login-register/login-register.component";
import {CategoryComponent} from "./components/category/category.component";
import {AddressComponent} from "./components/address/address.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'dashboard',component:DashboardComponent, canActivate: [AdminGaurd]},
  {path:'profile',component:ProfileComponent, canActivate: [AuthGaurd] },
  {path:'product',component:ProductComponent,canActivate: [AdminGaurd]},
  {path:'photo/:id',component:PhotoUploadComponent},
  {path:'details/:id',component:DetailsComponent},
  {path:'cart', component: CartComponent},
  // {path:'checkout', component: CheckoutComponent, canActivate: [AuthGaurd]},
  {path:'edit/:id', component: EditproductComponent, canActivate: [AdminGaurd]},
  {path:'editprofile/:id', component:EditprofileComponent, canActivate: [AuthGaurd]},
  {path: 'about', component: AboutContactComponent },
  {path: 'loginregister', component: LoginRegisterComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'address', component: AddressComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
