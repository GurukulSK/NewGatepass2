import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
  export interface DialogData {
    gid:string
    name: string;
    otp: string;
    id:string;
  }
@Component({
  selector: 'app-otp-veryfing-box',
  templateUrl: './otp-veryfing-box.component.html',
  styleUrls: ['./otp-veryfing-box.component.scss']
})
export class OtpVeryfingBoxComponent {
  err = false
  constructor(private api:ApiService,
    public dialogRef: MatDialogRef<OtpVeryfingBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  chek(){
    console.log(this.data);
    if(this.data.otp == undefined || this.data.otp == ""){
      this.err = true
      return;
    }

    let body = {
      id: this.data.id,
      gid: this.data.gid,
      otp: ""+this.data.otp+""
        }
    console.log();
    
    this.api.VerifyOtp(body).subscribe((data:any)=>{
      if(data.verify){
        console.log("clossing");
        this.dialogRef.close(data.verify);
      }
      else{
        this.err = true
        return;
      }
    })
    return;

  }
}
