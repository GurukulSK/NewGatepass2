import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Input()  login = false
  constructor(private router:Router){

  }
  refresh(){
    let url = this.router.url;
    this.router.navigateByUrl('login',{skipLocationChange:true}).then(()=>{
      this.router.navigateByUrl(url)
    })
  }
}
