import { Component } from '@angular/core';
import { Router } from '@angular/router';
export class login {
  username!: String | undefined;
  password!: String | undefined;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    login
  ]
})
export class LoginComponent {
  ShowPassword: boolean = false;
  click = false;
  Tost = false;
  TostType = 'success';
  TostText = 'Success Full';
  constructor(public loginInterface: login, private router: Router) { }
  toggalepass() {
    this.ShowPassword = !this.ShowPassword;
    (document.getElementById('passwordFild') as HTMLInputElement).type = this
      .ShowPassword
      ? 'text'
      : 'password';
  }
  login() {
    this.click = !this.click;

    if (!this.click) {
      console.log(this.click);
      this.Tost = true;
      this.TostType = 'warning';
      this.TostText = 'Login is Procecing';
      // console.log("akjsdfhlkasdjf");
      setTimeout(() => {
        this.Tost = false;
      }, 5000);
      return
    }
    if (this.click) {
      if (this.loginInterface.username == undefined) {
        this.Tost = true;
        this.TostType = 'danger';
        this.TostText = 'Please Enter Username';
        setTimeout(() => {
          this.Tost = false;
        }, 5000);
        return
      }
      if (this.loginInterface.password == undefined) {
        this.Tost = true;
        this.TostType = 'danger';
        this.TostText = 'Please Enter Password';
        setTimeout(() => {
          this.Tost = false;
        }, 5000);
        return
      }
      localStorage.setItem("role","admin")
      this.router.navigateByUrl("/admin")
    }
  }
}
