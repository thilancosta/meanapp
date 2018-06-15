import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Required
    if(!this.validateService.validateRegister(user)){
      this._flashMessagesService.show('please fill in all fields',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //validate email
    if(!this.validateService.validateEmail(user.email)){
      this._flashMessagesService.show('please use a valid email',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register user
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        this._flashMessagesService.show(data.msg,{cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this._flashMessagesService.show(data.msg,{cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login']);
      }
    })

  }

   

}
