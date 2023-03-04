import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loadder',
  templateUrl: './loadder.component.html',
  styleUrls: ['./loadder.component.scss']
})
export class LoadderComponent {
  @Input() maincolor = false;
  
}
