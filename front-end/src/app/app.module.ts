import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule, Routes} from "@angular/router";
import {Http, HttpModule} from "@angular/http";
import { FileUploadModule } from "ng2-file-upload";

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ValidateService} from "./services/validate.service";
import { FlashMessagesService} from "angular2-flash-messages";
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService} from "./services/auth.service";
import { AuthGaurd} from "./gaurds/auth.gaurd";
import { ProductComponent } from './components/product/product.component';
import {ProductService} from "./services/product.service";
import { FileService } from './services/file.service';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { HttpClient } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import {AdminGaurd} from "./gaurds/admin.gaurd";
import { DetailsComponent } from './components/details/details.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { AddressComponent } from './components/address/address.component';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from "@angular/material"
import { MatFormFieldModule } from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AutocompleteFilterExampleComponent } from './components/autocomplete-filter-example/autocomplete-filter-example.component';
import {FooterComponent} from "./components/footer/footer.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import { AboutContactComponent } from './components/about-contact/about-contact.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    ProductComponent,
    PhotoUploadComponent,
    CartComponent,
    DetailsComponent,
    EditproductComponent,
    EditprofileComponent,
    AddressComponent,
    AutocompleteFilterExampleComponent,
    FooterComponent,
    NavigationComponent,
    AboutContactComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
    NoopAnimationsModule,
    FileUploadModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService,
    FlashMessagesService,
    AuthService,
    AuthGaurd,
    ProductService,
    FileService,
    AdminGaurd
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
