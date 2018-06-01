import { Component, OnInit } from '@angular/core';
import { ValidateService} from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService} from "../../services/auth.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  name: String;
  email: String ;
  username: String;
  password: String;
  wishList: [String];
  buyList: [String];
  email2: String;
  password2: String;


  constructor(
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onRegisterSubmit(){
    const user = {
      name : this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      wishList: this.wishList,
      buyList: this.buyList
    }

    //Required Fiels
    if(!this.validateService.validateRegister(user)){
      // this.flashMessages.show('Please fill in all fields',{cssClass: 'alert-danger',timeout:300});
      // this.flashMessage.warning('Please fill in all fields',{delay:2000});
      this._flashMessagesService.show('Please fill in all fields!', { cssClass: 'alert-danger' } );

      return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)){
      // this.flashMessages.show('Please use a valid email',{cssClass: 'alert-danger',timeout:300});

      this._flashMessagesService.show('Please use valid Email!', { cssClass: 'alert-danger' } );
      return false;
    }

    this.authService.registerUser(user)
      .subscribe( data =>{
        if(data.success) {
          this._flashMessagesService.show('You are Registered and ', {cssClass: 'alert-success'});
          // this.router.navigate(['/loginregister']);
          this.email2 = this.email;
          this.password2 = this.password;
          this.onLoginSubmit();
        }
        else {
          this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger'});
          this.router.navigate(['/loginregister']);
        }
      })
  }

  onLoginSubmit(){

    const user2 ={
      email: this.email2,
      password: this.password2
    }

    this.authService.authenticateUser(user2).subscribe(res =>{

      //console.log(user.email);

      if(res.success){
        // console.log(res.data.isAdmin);
        localStorage.setItem('isAdmin',res.data.isAdmin);
        localStorage.setItem('loginId',res.data._id);

        this.authService.storeUserDatta(res.token, res.data);
        this._flashMessagesService.show('You are now Logged In!', { cssClass: 'alert-success' } );
        this.router.navigate(['/']);
      }
      else{
        this._flashMessagesService.show('Email or Password do not match', { cssClass: 'alert-danger' } );
        this.router.navigate(['/loginregister']);
      }
    })

  }
}
