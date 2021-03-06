import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./../../assets/ExternalCss.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private  route:Router) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        console.log(data);
        if (data.message) {
         alert("Vous étes bloquée !!");
        }
        else {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
         this.reloadPage();
  
          if(this.roles[0]== "ROLE_Client")
          {
  
            this.route.navigate(['/Client']);
          }
          if(this.roles[0]== "ROLE_Comptable")
          {
            this.route.navigate(['/Comptable'])
            console.log(this.tokenStorage.getUser());
          }
          if(this.roles[0]== "ROLE_Admin")
          {
            this.route.navigate(['/admin']);
          }
        }
        }
        ,
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}


