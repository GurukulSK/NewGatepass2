import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NodeService } from '../../services/node.service';
@Component({
  selector: 'app-nav-top-bar',
  templateUrl: './nav-top-bar.component.html',
  styleUrls: ['./nav-top-bar.component.scss'],
  providers: [TitleCasePipe],
})
export class NavTopBarComponent {
  title = 'Home';
  icon = 'barOver';
  hide = false;
  error = '';
  danger = false;
  warning = false;

  blueColor = '#3358AB';
  blueShadowColor = '#4C7DE3';

  redColor = '#711B15';
  redShadowColor = '#99271F';

  greenColor = '#526F6E';
  greenShadowColor = '#4E8276';

  orangeColor = '#9B5D46';
  orangeShadowColor = '#C07346';

  pinkColor = '#98358D';
  pinkShadowColor = '#B472A9';

  BlackColor = '#000';
  BlackShadowColor = '#252525';

  OrangeColor = "#FF6600"
  OrangeShadowColor = "#c54f00"

  PurpalColor = "#330066"
  PurpalShadowColor = "#130125"

  BrownColor = "#993366"
  BrownShadowColor = "#581e3b"

  LightPurpalColor = "#9900FF"
  LightPurpalShadowColor = "#5e029b"

  DarkColor = "#660066"
  DarkShadowColor = "#240424"


  success = false;
  constructor(
    private router: Router,
    private titlecase: TitleCasePipe,
    private nodeservice: NodeService
  ) {
    this.title = titlecase.transform(router.url.replace('/', ''));
    console.log(this.router.url);

    this.nodeservice.error_top.subscribe((err) => {
      this.error = err;
      // (document.getElementById("colors") as HTMLElement).style.width  = "25.5%"
      setTimeout(() => {
        this.error = '';
      //   (document.getElementById("colors") as HTMLElement).style.width  = "21%"
      }, 3000);
      this.nodeservice.error_type.subscribe((type) => {
        if (type == 'error') {
          this.danger = true;
          this.warning = false;
          this.success = false;
        }
        if (type == 'warning') {
          this.warning = true;
          this.danger = false;
          this.success = false;
        }
        if (type == 'success') {
          this.success = true;
          this.warning = false;
          this.danger = false;
        }
      });
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/registration') {
          this.title = 'Gatepass';
        }
        if (event.url == '/registration/Group-Gatepass') {
          this.title = 'Group Gatepass';
        }
      }
    });
  }
  ngOnInit(){
    let blue = document.querySelector('#redColor') as HTMLElement;
    blue.style.borderColor =  this.redColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
    // if(this.error != ""){
    //   let colors = (document.getElementById("colors") as HTMLElement);
    //   colors.style.width  = "25.5%"
    // }
  }
  @Output() HideEvent = new EventEmitter<boolean>();
  Hide() {
    // this.icon = "bars";
    this.hide = !this.hide;
    this.icon = this.hide ? 'bars' : 'barOver';
    this.HideEvent.emit(this.hide);
  }

  RemoveBorder(){
    (document.getElementById('BlueColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('redColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('orangeColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('greenColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('pinkColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('BlackColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('OrangeColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('PurpalColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('BrownColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('LightPurpalColor') as HTMLElement).style.borderColor = '#ffffff00';
    (document.getElementById('DarkPurpalColor') as HTMLElement).style.borderColor = '#ffffff00';
  }
  blackTheam(){
    document.documentElement.style.setProperty('--Primary_Color', this.BlackColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.BlackShadowColor);
    this.RemoveBorder()
    let blue = document.querySelector('#BlackColor') as HTMLElement;
    blue.style.borderColor =  this.BlackColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";

  }
  blueTheam() {
    document.documentElement.style.setProperty('--Primary_Color', this.blueColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.blueShadowColor);
    this.RemoveBorder()
    let blue = document.querySelector('#BlueColor') as HTMLElement;
    blue.style.borderColor =  this.blueColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
  }
  redTheam() {
    document.documentElement.style.setProperty('--Primary_Color', this.redColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.redShadowColor);
    this.RemoveBorder();
    let blue = document.querySelector('#redColor') as HTMLElement;
    blue.style.borderColor =  this.redColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
  }
  greenTheam() {
    document.documentElement.style.setProperty('--Primary_Color', this.greenColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.greenShadowColor);
    this.RemoveBorder()
    this.RemoveBorder();
    let blue = document.querySelector('#greenColor') as HTMLElement;
    blue.style.borderColor =  this.greenColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
  }
  orangeTheam() {
    document.documentElement.style.setProperty('--Primary_Color', this.orangeColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.orangeShadowColor);
    this.RemoveBorder()
    let blue = document.querySelector('#orangeColor') as HTMLElement;
    blue.style.borderColor =  this.orangeColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";

  }
  pinkTheam() {
    document.documentElement.style.setProperty('--Primary_Color', this.pinkColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.pinkShadowColor);
    this.RemoveBorder()
    let blue = document.querySelector('#pinkColor') as HTMLElement;
    blue.style.borderColor =  this.pinkColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
  }
  OrangeTheam(){
    document.documentElement.style.setProperty('--Primary_Color', this.OrangeColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.OrangeShadowColor);
    this.RemoveBorder()
    let blue = document.querySelector('#OrangeColor') as HTMLElement;
    blue.style.borderColor =  this.OrangeColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
  }
  PurpalTheam(){
    document.documentElement.style.setProperty('--Primary_Color', this.PurpalColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.PurpalShadowColor);
    this.RemoveBorder()
    let blue = document.querySelector('#PurpalColor') as HTMLElement;
    blue.style.borderColor =  this.PurpalColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
  }
  BrownTheam(){
    document.documentElement.style.setProperty('--Primary_Color', this.BrownColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.BrownShadowColor);
    this.RemoveBorder()
    let blue = document.querySelector('#BrownColor') as HTMLElement;
    blue.style.borderColor =  this.BrownColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
  }
  LightPurpalTheam(){
    document.documentElement.style.setProperty('--Primary_Color', this.LightPurpalColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.LightPurpalShadowColor);
    this.RemoveBorder()
    let blue = document.querySelector('#LightPurpalColor') as HTMLElement;
    blue.style.borderColor =  this.LightPurpalColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
  }
  DarkPurpalTheam(){
    document.documentElement.style.setProperty('--Primary_Color', this.DarkColor);
    document.documentElement.style.setProperty('--Primary_Color_hover', this.DarkShadowColor);
    this.RemoveBorder()
    let blue = document.querySelector('#DarkPurpalColor') as HTMLElement;
    blue.style.borderColor =  this.DarkColor;
    blue.style.borderWidth = '2px';
    blue.style.borderStyle = 'solid';
    blue.style.borderRadius = "100px";
  }
}

