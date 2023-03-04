import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'widget-icon-input',
  templateUrl: './icpn-input.component.html',
  styleUrls: ['./icpn-input.component.scss']
})
export class IcpnInputComponent {
  @Input() Mandetary  = true
  @Input() label  = "Your Lable"
  @Input() type  = "text"
  @Input() placeholder  = "Placeholder"
  @Input() disable  =   false
  @Input() defaule?:string;
  @Input() icon  = "/assets/icon/user.svg"
  @Input() name  = "gid"
  @Input() gid  = false
  @Input() loadder  = false
  @Input() Label :boolean  = true; 
  value:any;
  @Output() GetdataEvent =new EventEmitter<String>();
  getdata() {
    this.GetdataEvent.emit(this.value);
  }
}
