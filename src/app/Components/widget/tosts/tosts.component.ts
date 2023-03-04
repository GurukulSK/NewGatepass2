import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tosts',
  templateUrl: './tosts.component.html',
  styleUrls: ['./tosts.component.scss']
})
export class TostsComponent {
  @Input() text = "Demo Tosts"
  @Input() type = ""
  success = true;
  warning = false;
  danger = false;
  
  constructor(){
    if(this.type="success"){
      this.success = true
      this.warning = false;
      this.danger = false;
    }
    if(this.type="warning"){
      this.danger=false
      this.success=false
      this.warning=true
    }
    if(this.type="danger"){
      this.danger=true
      this.success=false
      this.warning=false
    }
  }

}
