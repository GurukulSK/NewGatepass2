import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ApiService } from '../services/api.service';
import { NodeService } from '../services/node.service';
export class SabhaEntry {
  gid?: number;
  name?: string;
  suname?: string;
  father?: string;
  std?: string;
  room?: string;
}

@Component({
  selector: 'app-sabha',
  templateUrl: './sabha.component.html',
  styleUrls: ['./sabha.component.scss'],
  providers: [SabhaEntry]
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
  submitAnime = false;
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
      this.gidloader = true;
      this.gid_input = " ";
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
          // this.gid_input = " ";
          if (data.message == 'ok') {
            this.gid_input = " ";
            this.api.GetStudent(gid).subscribe((data: any) => {
              if(data.message){
                this.gid_input = " ";
                // this.gid_input = " ";
                if(this.grouplist.length == 0){
                
                  this.animat("0px", true)
                }
                this.nodeservice.error_set("Enter valid GID","warning")
                return
              }
              else{
                this.gid_input = " ";
                this.animat("200px", false)
                let student = new SabhaEntry();
                student.gid = data[0].gid;
                student.name = data[0].name;
                student.suname = data[0].surname;
                student.std = data[0].std;
                student.room = data[0].room;
                student.father = data[0].father;
                this.grouplist.push(student);
              }
            });
            this.gidloader = false;
          } else {
            this.gid_input = " ";
            this.nodeservice.error_set('you are alredy registerd', 'warning');
            this.gidloader = false;
            if(this.grouplist.length == 0){
              this.animat("0px", true)
            }
          }
        });
      } else {
      if(this.grouplist.length == 0){

        this.animat("0px", true)
      }
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
  success_lottie: AnimationOptions = {
    path: '/assets/success_lottie.json',
  }
  entry() {
    this.Permision_error = false;
    this.Seva_error = false;
    if (!this.loader_button) {
      this.loader_button = true
      if (this.grouplist.length == 0) {
        this.nodeservice.error_set("Student List Is Empty", "warning")
        this.loader_button = false
        return
      }
      if (this.permission == "" || this.permission == "Select" || this.permission == undefined) {
        this.Permision_error = true
        this.loader_button = false
        return
      }
      if (this.seva == "" || this.seva == "Select" || this.seva == undefined) {
        this.Seva_error = true
        this.loader_button = false
        return
      }
      this.submitAnime = true;
      var Entry = false
      for (let i = 0; i < this.grouplist.length; i++) {
        const student = this.grouplist[i];
        let body = {
          gid: student.gid,
          name: student.name,
          surname: student.suname,
          father: student.father,
          room: student.room,
          std: student.std,
          permit: this.permission,
          seva: this.seva
        }
        this.api.SabhaEntry(body).subscribe((data) => {
          console.log("Done");
          Entry = true
        },
          err => {
            Entry = false
            console.log(err);
            this.nodeservice.error_set("Error Ouccure!","error")
            return
          })

      }
      setInterval
      (()=>{
        this.submitAnime = false
        this.loader_button = false
        this.cancle()
      },1000)
        return
    }
  }
}
