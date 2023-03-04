import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'widget-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss'],
  providers: [UpperCasePipe],
})
export class SelectBoxComponent {
  constructor(private upper: UpperCasePipe) {
    this.DemoData = this.data;
    if (this.error) {
      let ele = document.getElementById('Select') as HTMLElement;
      ele.style.marginBottom = '0px';
    }
  }
  removeDuplicates(arr:any) {
    return [...new Set(arr)];
}
  text?: string;
  open = false;
  @Input() error = false;
  @Input() label = 'Select Value';
  @Input() Mandetary = true;
  @Input() Label = true;
  @Input() disabled = false;
  @Input() input = false;
  @Input() Ids!: string;
  @Input() Value = this.text;
  @Input() data!: Array<Object>;
  @Output() SelectesValue = new EventEmitter<string>();
  serchString!: string;
  DemoData: any = this.data;

  options() {
    this.open = !this.open;
    this.DemoData = this.data;
    const eles = document.getElementsByClassName('option');
    for (let i = 0; i < eles.length; i++) {
      const elements = eles[i];
      elements.classList.remove('active');
    }
    const arroess = document.getElementsByClassName('arrow');
    for (let i = 0; i < arroess.length; i++) {
      const elements = arroess[i];
      elements.classList.remove('rotet');
    }
    const ele = document.getElementById(this.Ids) as HTMLElement;
    const arrow = document.getElementById(this.Ids + 'arrow') as HTMLElement;
    // ele.style.display = this.open?'block':"none";
    if (this.open) {
      ele.classList.add('active');
      arrow.classList.add('rotet');
    }
  }
  SearchData(event: any) {
    this.serchString = event;
    var datas: any[] = [];
    this.data.map((value: any) => {
      let key = Object.keys(value)[0];
      if (
        this.upper
          .transform(value[key])
          .startsWith(this.upper.transform(this.serchString))
      )
      {
        datas.push(value);
      }
    });
    this.DemoData = datas;
  }
  inputBox(event: any) {
    console.log(event.target.value);
    this.SelectesValue.emit(event.target.value);
  }
  Select(Data: any) {
    this.open = !this.open;
    let key = Object.keys(Data)[0];
    this.text = Data[key];
    const eles = document.getElementsByClassName('option');
    for (let i = 0; i < eles.length; i++) {
      const elements = eles[i];
      elements.classList.remove('active');
    }
    const arroess = document.getElementsByClassName('arrow');
    for (let i = 0; i < arroess.length; i++) {
      const elements = arroess[i];
      elements.classList.remove('rotet');
    }

    if (this.text == 'Other')
    {
      this.input = true;
      return;
    }
    else {
      this.input = false;
    }
    this.SelectesValue.emit(this.text);
  }
}
