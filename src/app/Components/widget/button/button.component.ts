import { Component, Input } from '@angular/core';

@Component({
  selector: 'widget-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
@Input() text="Submit";
@Input() loader=false;
constructor(){
}
}
