import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'widget-normal-input',
  templateUrl: './normal-input.component.html',
  styleUrls: ['./normal-input.component.scss']
})
export class NormalInputComponent {
  @Input() error = false;
  @Input() Mandetary  = true
  @Input() label  = ""
  @Input() type  = "text"
  @Input() placeholder  = "Placeholder"
  @Input() disable  = false
  @Input() Label  = true
  @Input() defaule?:string;
  @Input() mexlength=5;
  @Input() bold?:boolean;
  value:any;
  @Output() GetdataEvent =new EventEmitter<string>();
  @Input() number=false;
  constructor(){
    if(this.error){
      let ele = document.getElementById('Input') as HTMLElement;
      ele.style.marginBottom="0px";
    }

  }
  getdata() {
    this.GetdataEvent.emit(this.defaule);
  }
}
