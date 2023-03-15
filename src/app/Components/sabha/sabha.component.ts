import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NodeService } from '../services/node.service';
export class SabhaEntry{
  gid?:number;
  name?:string;
  suname?:string;
  std?:string;
  room?:string;
}

@Component({
  selector: 'app-sabha',
  templateUrl: './sabha.component.html',
  styleUrls: ['./sabha.component.scss'],
  providers:[SabhaEntry]
})

export class SabhaComponent {
  gidloader: boolean = false;
  loader_button: boolean = false;
  gid_input = "";
  seva: string = 'Select';
  SevaName = [
    {
      seva: 'Select',
    },
    {
      seva: 'Bhandar',
    },
    {
      seva: 'Chhataralay Safai',
    },
    {
      seva: 'School Safai',
    },
    {
      seva: 'JSC Office',
    },
    {
      seva: 'Gurukul Office',
    },
    {
      seva: 'Electric',
    },
    {
      seva: 'Sihasan',
    },
    {
      seva: 'Medical',
    },
    {
      seva: 'P. Bal Swami',
    },
    {
      seva: 'P. Shyamji bhagat',
    },
    {
      seva: 'P. Purushottam Bhagat',
    },
    {
      seva: 'General',
    },
    {
      seva: 'BIC Lab',
    },
    {
      seva: 'G-vision',
    },
    {
      seva: 'Sound',
    },
    {
      seva: 'Gurukul Darshan',
    },
    {
      seva: 'Dharmik Store',
    },
  ];
  GroupList = new SabhaEntry();
  grouplist = [this.GroupList];
  height: string = '0px';
  permission: string = 'Select';
  authpersion = [
    { name: 'Suryakantbhai Patel' },
    { name: 'Bhaveshbhai Savani' },
    { name: 'Jitendrabhai Jodhani' },
    { name: 'Ghanshyambhai Bhimani' },
    { name: 'Yogeshbhai Vegad' },
    { name: 'Tarunbhai Radadiya' },
  ];
  constructor(
    private nodeservice: NodeService,
    private router: Router,
    private api: ApiService
  ) {
    this.grouplist.shift();
  }
  gidd(gid: any) {
    if (gid.length == 5) {
      this.gid_input = "";
      this.gidloader = true;
      for (let i = 0; i < this.grouplist.length; i++) {
        const element = this.grouplist[i];
        if (element.gid == gid) {
          this.nodeservice.error_set(
            'GID is already available in List',
            'warning'
            );
            this.gidloader = false;
            return;
        }
      }
      this.api.SabhaStatus(gid).subscribe((data: any) => {
        if (data.message == 'ok') {
          this.api.GetStudent(gid).subscribe((data: any) => {
            let student = new SabhaEntry();
            student.gid = data[0].gid;
            student.name = data[0].name;
            student.suname = data[0].surname;
            student.std = data[0].std;
            student.room = data[0].room;
            this.grouplist.push(student);
            this.gid_input = "";
          });
          this.gid_input = "";
          this.gidloader = false;
        } else {
          this.nodeservice.error_set('you are alredy registerd', 'warning');
          this.gidloader = false;
          this.gid_input = "";
        }
      });
    } else {
      this.gid_input = "";
      this.gidloader = false;
    }
  }
  RemoveStudent(i: any) {
    this.grouplist.splice(i, 1);
    if (this.grouplist.length == 0) {
      setTimeout(() => {
        this.animat(this.height, true);
      }, 200);
    }
    this.nodeservice.updategid('');
  }

  animat(height: string, err: boolean) {
    let eleref = document.getElementById('Forms') as HTMLElement;
    if (eleref.style.height == 'auto') {
    } else {
      eleref.style.height = height;
    }
    setTimeout(() => {
      eleref.style.height = err ? '0px' : 'auto';
      eleref.style.opacity = err ? '0' : '1';
      this.gidloader = false;
    }, 400);
  }
  cancle() {
    this.loader_button = true
    this.router
    .navigate(['/registration'], { skipLocationChange: true })
    .then(() => {
      this.router.navigateByUrl('/registration/sabha');
      this.loader_button = false
      });
  }
  Permision_error = false;
  Seva_error = false;
  entry() {
    this.Permision_error = false;
    this.Seva_error = false;
    if(!this.loader_button){
      this.loader_button = true
      if(this.grouplist.length == 0){
        this.nodeservice.error_set("Student List Is Empty","warning")
        this.loader_button = false
        return
      }
      if(this.permission == "" || this.permission == "Select" || this.permission == undefined){
        this.Permision_error = true
        this.loader_button = false
        return
      }
      if(this.seva == "" || this.seva == "Select" || this.seva == undefined){
        this.Seva_error = true
        this.loader_button = false
        return
      }

      return
    }
  }
}
