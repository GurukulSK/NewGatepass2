import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  login =false
  HideOrNot=true
  gid = ""
  constructor(private router:Router){
    console.log(this.router.url );
    if(this.router.url == "/login"){
     this.login = true
     console.log(this.login);

    }
    else{
      this.login = false
      console.log(this.login);
    }
    this.router.events.subscribe((event )=>{
      if(event instanceof NavigationEnd){
        if(event.url == "/login"){
          this.login = true
        }
      else
      {
        this.login = false
      }
      }
    })
  }
  hide(hides:any){
    if(this.HideOrNot){
      this.HideOrNot = false
    }
    else{
      setTimeout(() => {
        this.HideOrNot=true
      }, 100);
      // this.HideOrNot = true
    }

    console.log(this.HideOrNot);
    console.log(hides);
    const ele = document.getElementById('route') as HTMLElement;
    ele.style.marginLeft = hides?"0%":"20%"
    ele.style.marginTop = "10px"
    // ele.style.marginTop = this.HideO2rNot?"0%":"3%"

  }

}
