import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';
import { OtpVeryfingBoxComponent } from './Components/Registration/otp-veryfing-box/otp-veryfing-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Smart_Gurukul';
  constructor(public dialog: MatDialog){
      // localStorage.setItem("Hello" , "why are ypu late")
      // dialog.open(OtpVeryfingBoxComponent,{data:{gid: "20118",
      //   name: "krish",
      //   otp: '',
      //   id: 2,}})

  }

  change(){
    document.documentElement.style.setProperty('--main_background', 'blue');
  }
}
