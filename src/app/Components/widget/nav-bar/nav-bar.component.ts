import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TitleCasePipe, Location } from '@angular/common';
import { NodeService } from '../../services/node.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  providers: [
    TitleCasePipe
  ]
})
export class NavBarComponent {
  title = "Home";
  route = ""
  url = "";
  home = false
  gatepass = true
  constructor(private location: Location, private router: Router, private titlecase: TitleCasePipe, private nodeservice: NodeService) {
    nodeservice.url.subscribe((value) => {
      this.url = value
    })

    let Routeurl = this.location.path()

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = titlecase.transform(event.url.replace('/', ''));
        let url = event.url
      }
    })
    if (Routeurl == "/registration") {
      document.getElementById('gatepass')?.classList.add("active");
      document.getElementById('groupgatepass')?.classList.remove("active");
    }
    if (Routeurl == "/registration/Group-Gatepass") {
      document.getElementById('gatepass')?.classList.remove('active');
      document.getElementById('groupgatepass')?.classList.add('active');
    }
  }
  routechange(url: string) {
    this.router.navigateByUrl(url);
    if (url == "registration") {
      (document.getElementById('groupgatepass') as HTMLElement).classList.remove("active");
      (document.getElementById('sabha') as HTMLElement).classList.remove("active");
      (document.getElementById('gatepass') as HTMLElement).classList.add("active");
      (document.getElementById('admin') as HTMLElement).classList.remove('active');
    }
    if (url == "registration/Group-Gatepass") {
      (document.getElementById('sabha') as HTMLElement).classList.remove("active");
      (document.getElementById('gatepass') as HTMLElement).classList.remove('active');
      (document.getElementById('groupgatepass') as HTMLElement).classList.add('active');
      (document.getElementById('admin') as HTMLElement).classList.remove('active');
    }
    if (url == "registration/sabha") {
      (document.getElementById('gatepass') as HTMLElement).classList.remove('active');
      (document.getElementById('sabha') as HTMLElement).classList.add("active");
      (document.getElementById('groupgatepass') as HTMLElement).classList.remove('active');
      (document.getElementById('admin') as HTMLElement).classList.remove('active');
    }
    if (url == "admin") {
      (document.getElementById('gatepass') as HTMLElement).classList.remove('active');
      (document.getElementById('sabha') as HTMLElement).classList.remove("active");
      (document.getElementById('groupgatepass') as HTMLElement).classList.remove('active');
      (document.getElementById('admin') as HTMLElement).classList.add('active');
    }
  }
}
