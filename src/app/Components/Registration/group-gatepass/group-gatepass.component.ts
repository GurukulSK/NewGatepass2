import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Studentdata } from 'src/app/Model/studentdata';
import { ApiService } from '../../services/api.service';
import { NodeService } from '../../services/node.service';
import { GroupEntry } from 'src/app/Model/GroupEntry';
import { GatepassEntry } from 'src/app/Model/GatepassEntryModel';
import { OtpVeryfingBoxComponent } from '../otp-veryfing-box/otp-veryfing-box.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';
export class errors {
  area_error = false;
  place_error = false;
  reason_error = false;
  return_time_error = false;
  permission_error = false;
  with_error = false;
  with_name_error = false;
  with_number_error = false;
}
@Component({
  selector: 'app-group-gatepass',
  templateUrl: './group-gatepass.component.html',
  styleUrls: ['./group-gatepass.component.scss'],
  providers: [DatePipe, GatepassEntry, errors],
})
export class GroupGatepassComponent implements OnDestroy {
  Groupentry = new GroupEntry();
  grouplist = [this.Groupentry];
  date = new Date();
  Curtime: any;
  error = false;
  gid_list = [''];
  late_permission = 'Select';
  late_reasone?: string;
  height = '600px';

  with = [
    { with: 'Select' },
    { with: 'Bhagat' },
    { with: 'Sant' },
    { with: 'Friend' },
    { with: 'Father' },
    { with: 'Mother' },
    { with: 'Sister' },
    { with: 'Brother' },
    { with: 'Villager' },
    { with: 'Rectore' },
    { with: 'Uncal' },
    { with: 'Aunty' },
    { with: 'Devotee' },
  ];
  student: Studentdata[] = [
    {
      id: 0,
      gid: '',
      room: '',
      cup_no: '',
      surname: '',
      name: '',
      father: '',
      village: '',
      std: '',
      img: ""
    },
  ];
  authpersion = [
    { name: 'Suryakant Bhai' },
    { name: 'Jitendrabhai Jodhani' },
    { name: 'Ghanshyambhai Bhimani' },
    { name: 'Yogeshbhai Vegad' },
    { name: 'Tarunbhai Radadiya' },
  ];
  regular = false;
  withbool = false;
  loader_button: any;
  area_list: any;
  place_list: any;
  punch: any;
  reason_list: any;
  constructor(
    private router: Router,
    private api: ApiService,
    private datepipe: DatePipe,
    private nodeservice: NodeService,
    public entryModel: GatepassEntry,
    public errors: errors,
    public dialog: MatDialog
  ) {
    // this.getpunch()
  }
  ngOnInit() {
    this.Curtime = this.datepipe.transform(this.date, 'hh:mm a');
    this.grouplist.shift();
    this.gid_list.shift();
    console.log();
    this.api.getAreaList().subscribe((data) => {
      this.area_list = data
    })
    this.api.getPlaceList().subscribe((data) => {
      this.place_list = data
    })
    this.api.getReasonList().subscribe((data) => {
      this.reason_list = data
    })
    this.gid_list = []
    this.grouplist = []
    setInterval(() => {
      this.date = new Date();
      this.Curtime = this.datepipe.transform(this.date, 'hh:mm a');
    }, 1000);
  }
  ngOnDestroy(): void {
    this.gid_list = []
    this.nodeservice.updategid("")

    this.grouplist = []
    try {
      this.punch.unsubscribe()
    } catch {
      console.log("Can not unsubscribe gate pass request");
    }
  }
  Entry: string = '';
  data = [
    { area: 'Anjali' },
    { area: 'Ashram Road' },
    { area: 'Ashram Road' },
    { area: 'Bapunagar-Nikol' },
    { area: 'CHandlodiya under bridge' },
    { area: 'Chharodi' },
    { area: 'Drive-in' },
    { area: 'Drive-in Road' },
    { area: 'Gadhada' },
    { area: 'Ghatlodiya' },
    { area: 'Gota' },
    { area: 'Gujarat University' },
    { area: 'Gujarat University' },
    { area: 'Gujarat University' },
    { area: 'Gurukul' },
    { area: 'Income-tax' },
    { area: 'Kalupur' },
    { area: 'Khokhra' },
    { area: 'Lal Darwaja' },
    { area: 'Lo Garden' },
    { area: 'Low Garden' },
    { area: 'Memnagar Gam' },
    { area: 'Memnagar Gam' },
    { area: 'Navarangpura' },
    { area: 'Navarangpura' },
    { area: 'Panjarapol' },
    { area: 'S.G.Highway' },
    { area: 'Sarkhej' },
    { area: 'Satelite' },
    { area: 'Shivranjani' },
    { area: 'Subhash Chowk' },
    { area: 'Usmanpura' },
    { area: 'Vadtal' },
    { area: 'Vastrapur' },
  ];
  place_value = 'Select';
  area_value = 'Select';
  reson_value = 'Select';
  permition_value = 'Select';
  gid!: any;
  relative_value = 'Select';
  am_pm = 'AM';
  options: AnimationOptions = {
    path: '/assets/500-fingerprint-security-outline.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  gidloader = false;
  fingerclick: any;
  FingerAnime = false
  success_lottie: AnimationOptions = {
    path: '/assets/success_lottie.json',
  }
  submitAnime = false;
  refresh(){

  }
  getpunch() {
    this.options = {
      path: '/assets/500-fingerprint-security-outline.json',
    };
    setTimeout(() => {
      (document.getElementById("Lottie-anime") as HTMLElement).style.width = "200px"
    }, 100)
    this.FingerAnime = true
    if (!this.fingerclick) {
      this.fingerclick = true
      this.punch = this.api.Getpunch().subscribe(
        (data: any) => {
          if (data.Card_Number) {
            this.options = {
              path: "/assets/89784-fingerprint.json"
            };
            (document.getElementById("Lottie-anime") as HTMLElement).style.width = "150px";
            (document.getElementById("Lottie-anime") as HTMLElement).style.padding = "35px";
          }
          setTimeout(() => {
            this.fingerclick = false
            this.FingerAnime = false
          }, 1100)
          this.student[0].gid = data.Card_Number
          this.gidd(data.Card_Number)
        },
        (err) => {
          this.FingerAnime = false
          this.fingerclick = false
          console.log(err);
        })
    }
  }
  withChangeSelect(value: any) {
    if (value != 'Select') {
      this.withbool = true;
    } else {
      this.withbool = false;
    }
    this.entryModel.with = value;
  }
  EntryChek(chek: any) {
    let buttons = document.getElementsByClassName('EntryButton');
    if (chek == 'r') {
      this.nodeservice.error_set("Regular Entry not allowed in Group", "warning")
    }
    if (chek == 's') {
      buttons[0].classList.remove("active")
      buttons[1].classList.add("active")
    }
    this.regular = false;
    // for (let i = 0; i < buttons.length; i++) {
    //   const ele = buttons[i];
    //   ele.classList.toggle('active');
    // }
  }
  logdata(giis: any) {
    console.log(giis);
  }
  Relative(event: string) {
    this.relative_value = event;
  }
  jump(event: any) {
    if (event.target.value.length == 2) {
      if (event.target.value.length < 3) {
        let ele = event.target.nextElementSibling;
        ele.focus();
      }
    }
  }
  changetext() {
    if (this.entryModel.return_time_am_pm == 'AM') {
      this.entryModel.return_time_am_pm = 'PM';
    } else {
      this.entryModel.return_time_am_pm = 'AM';
    }
  }
  removeList(i: number) {
    this.grouplist.splice(i, 1);
    this.gid_list.splice(i, 1);
    if (this.grouplist.length == 0) {
      this.Entry = '';
      this.height = '0px';
      setTimeout(() => {
        this.animat(this.height, true);
      }, 200);
      this.student[0].gid = ""
    }
    this.nodeservice.updategid("")
  }
  animat(height: string, err: boolean) {
    let eleref = document.getElementById('Forms') as HTMLElement;
    if (eleref.style.height == 'auto') {
      console.log('tjis is in auto');
    } else {
      eleref.style.height = height;
    }
    setTimeout(() => {
      eleref.style.height = err ? '0px' : 'auto';
      eleref.style.opacity = err ? '0' : '1';
      this.gidloader = false;
    }, 400);
  }
  gidd(gid: any) {
    console.log(gid);
    if (gid.length == 5) {
      this.api.chekBlock(gid).subscribe((data:any)=>{
        if(data['block']==0){

     
      this.gidloader = true;
      this.loader_button = false;
      let error = false;
      if (this.grouplist.length > 4) {
        let list = document.getElementById('list') as HTMLElement;
        list.style.height = '300px';
        list.style.overflow = 'auto';
      }
      this.api.ChekGatePass(gid).subscribe((data: any) => {
        if (data['message'] == 'False') {
          this.nodeservice.error_set('Return is not allowed in Group Gatepass', 'warning');
          this.gidloader = false
          this.student[0].gid = ""
          if(this.grouplist.length > 0){

          }
          else{

            this.Entry = '';
            this.height = '0px';
            error = true;
          }
        }
        else {
          this.height = '450px';
          this.Entry = 'true';
          let exist = false;
          this.api.GetStudentDataForGatepass(gid).subscribe((data: any) => {
            if (data.id == 0) {
              this.nodeservice.error_set('Invalid GID', 'warning');
              this.Entry = '';
              this.height = '0px';
              error = true
              console.log("not ge");

            } else {
              this.nodeservice.updategid(data.url);
              for (let i = 0; i < this.grouplist.length; i++) {
                const ele = this.grouplist[i];
                if (ele.gid == data.gid) {
                  console.log(this.grouplist);
                  this.nodeservice.error_set('GID is already available in List', 'warning');
                  exist = true;
                  break;
                }
              }
              if (!exist) {
                console.log(this.grouplist);
                let group = new GroupEntry();
                group.gid = data.gid;
                group.name = data.name;
                group.suname = data.surname;
                group.std = data.stndard;
                // if (this.regular) {
                //   console.log('in regular');
                //   this.api.getRegularList(data.gid).subscribe((data: any) => {
                //     if (this.entryModel.reason != 'Study') {
                //       console.log('inmodel');
                //       if (data.data.place != null) {
                //         this.entryModel.place = data.data.place;
                //         this.entryModel.area = data.data.area;
                //         this.entryModel.reason = 'Study';
                //         this.entryModel.permission = 'Suryakant Bhai';
                //       }
                //       this.grouplist.push(group);
                //       this.gid_list.push(group.gid!.toString());
                //     }
                //     else {
                //       if (this.entryModel.area == data.data.area) {
                //         this.grouplist.push(group);
                //         this.gid_list.push(group.gid!.toString());
                //       } else {
                //         this.nodeservice.error_set('Same College and Place is Required', 'warning');
                //       }
                //     }
                //   });
                // }
                //  else {
                  this.grouplist.push(group);
                  this.gid_list.push(group.gid!.toString());
                  console.log(this.gid_list);
                  console.log(this.student[0].name);
              this.gidloader = false

                // }
              }
            }
            console.log(this.grouplist);
          });
          setTimeout(() => {
            this.animat(this.height, error);
          }, 200);
        }
      });
    }
    else{
      this.nodeservice.error_set("You Are Blocked !! Meet ADMIN","error")
    }
  })
    } else {
      if (this.grouplist.length < 1) {
        this.Entry = '';
      }

      this.student[0].id = 0;
      this.student[0].gid = '';
      this.student[0].name = '';
      this.student[0].father = '';
      this.student[0].surname = '';
      this.student[0].room = '';
      this.student[0].village = '';
      this.student[0].cup_no = '';
      this.student[0].std = '';
      this.nodeservice.updategid('');
      if (this.grouplist.length < 1) {
        this.entryModel.area = 'Select';
        this.entryModel.place = 'Select';
        this.entryModel.permission = 'Select';
        this.entryModel.reason = 'Select';
        this.entryModel.reason = 'Select';
        this.entryModel.with = 'Self';
        this.nodeservice.updategid('');
        this.errors.area_error = false;
        this.errors.place_error = false;
        this.errors.reason_error = false;
        this.errors.permission_error = false;
        this.errors.return_time_error = false;
        this.errors.with_error = false;
        this.errors.with_name_error = false;
        this.errors.with_number_error = false;
      }
      this.gidloader = false

    }


  }
  entry() {
    if(this.grouplist.length < 1){
      this.nodeservice.error_set("One student can not do group Entry","warning")
      return;
    }
    if (this.loader_button) {
      return;
    }
    let em = this.entryModel;
    this.errors.area_error =
      em.area == 'Select' || em.area == '' || em.area == null ? true : false;
    this.errors.place_error =
      em.place == 'Select' || em.place == '' || em.place == null ? true : false;
    this.errors.reason_error =
      em.reason == 'Select' || em.reason == '' || em.reason == null ? true : false;
    this.errors.return_time_error =
      em.return_time_mm == undefined ? true : false;
    this.errors.return_time_error =
      em.return_time_hh == undefined ? true : false;
    this.errors.permission_error =
      em.permission == 'Select' || em.permission == '' || em.permission == null ? true : false;
    if (em.with != 'Select') {
      this.errors.with_error =
        em.with == 'Select' || em.with == '' || em.with == null ? true : false;
      this.errors.with_name_error = em.with_name == undefined ? true : false;
      this.errors.with_number_error =
        em.with_number == undefined ? true : false;
      // return
    }
    if (em.return_time_hh.toString() == "" || em.return_time_mm.toString() == "" || em.return_time_mm > 59 || em.return_time_hh > 12 || em.return_time_hh == 0 ) {
      this.errors.return_time_error = true;
    }
    if (
      this.errors.area_error == false &&
      this.errors.place_error == false &&
      this.errors.reason_error == false &&
      this.errors.return_time_error == false &&
      this.errors.permission_error == false &&
      this.errors.with_error == false
    ) {

      this.loader_button = true;
      if (!this.regular) {
        console.log("This is regular");
        let id;
        this.api.GanaretOtp(this.grouplist[0].gid).subscribe((data: any) => {
          id = data.verify_id;
          if (id != 0) {
            // this.nodeservice.error_set('Otp ganreted succesfully', 'success');
          }
          const dialogRef = this.dialog.open(OtpVeryfingBoxComponent, {
            data: {
              gid: this.grouplist[0].gid,
              name: this.grouplist[0].name,
              otp: '',
              id: id,
            },
            disableClose: true,
          });
          dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
              let body = {
                gid: this.gid_list,
                place: em.place,
                area: em.area,
                reason: em.reason,
                with: em.with,
                with_name: em.with_name,
                with_number: em.with_number,
                commited_time:
                  (em.return_time_hh < 10
                    ? '0' + em.return_time_hh
                    : em.return_time_hh) +
                  ':' +
                  (em.return_time_mm < 10
                    ? '0' + em.return_time_mm
                    : em.return_time_mm) +
                  ' ' +
                  em.return_time_am_pm,
                permission: em.permission,
              };
              this.api.GatepassEntry(body).subscribe((data) => {
                let stu = this.grouplist[0]
                let NewDate = this.datepipe.transform(new Date(),'dd-MM-yyyy')
                let ReturnTime = em.return_time_hh+":"+em.return_time_mm+" "+em.return_time_am_pm
                let students = ""
                for (let i = 0; i < this.grouplist.length; i++) {
                  const ele = this.grouplist[i];
                  students += `${i+1} - ${ele.gid} - ${ele.name} ${ele.suname}\n`;
                }
                if(this,this.withbool){

                  let message = {
                    gid : stu.gid,
                    mes : `${stu.name}  ${stu.suname}\nGID - ${stu.gid}\nStd. - ${stu.std}\n\nGoing to  - ${em.place}\nArea - ${em.area}\nReason - ${em.reason}\n\nDate - ${NewDate}\nTime - ${this.Curtime}\nExpected Return Time - ${ReturnTime}\n\nWith - ${em.with}\nWith Name - ${em.with_name}\nWith Number - ${em.with_number}\n\nPermission - ${em.permission}\n\nStudents : \n${students}`

                  }
                  this.api.Sendmessage(message).subscribe((data) => {
                  });
                }
                else{
                  let message = {
                    gid : stu.gid,
                    mes : `${stu.name}  ${stu.suname}\nGID - ${stu.gid}\nStd. - ${stu.std}\n\nGoing to  - ${em.place}\nArea - ${em.area}\nReason - ${em.reason}\n\nDate - ${NewDate}\nTime - ${this.Curtime}\nExpected Return Time - ${ReturnTime}\n\nPermission - ${em.permission}\n\nStudents : \n${students}`

                  }
                  this.api.Sendmessage(message).subscribe((data) => {
                  });

                }
                this.Entry = '';
                this.student[0].gid = '';
                this.gid_list = [];
                this.grouplist = [];
                this.nodeservice.updategid("")
                this.student[0].id = 0;
                this.student[0].gid = '';
                this.student[0].name = '';
                this.student[0].father = '';
                this.student[0].surname = '';
                this.student[0].room = '';
                this.student[0].village = '';
                this.student[0].cup_no = '';
                this.student[0].std = '';
                this.nodeservice.updategid('');
                this.entryModel.area = 'Select';
                this.entryModel.place = 'Select';
                this.entryModel.permission = 'Select';
                this.entryModel.reason = 'Select';
                this.entryModel.reason = 'Select';
                this.entryModel.with = 'Self';
                this.nodeservice.updategid('');
                this.errors.area_error = false;
                this.errors.place_error = false;
                this.errors.reason_error = false;
                this.errors.permission_error = false;
                this.errors.return_time_error = false;
                this.errors.with_error = false;
                this.errors.with_name_error = false;
                this.errors.with_number_error = false;
                this.submitAnime = true
                this.gidloader = false
                setTimeout(() => {
                  this.submitAnime = false;
                  this.FingerAnime = false;
                }, 2000)
                this.Entry = '';
                this.student[0].gid = '';
              });
            } else {
              this.loader_button = false;
              this.Entry = '';
              this.student[0].gid = '';
              this.gid_list = [];
              this.grouplist = [];
              this.Entry = '';
              this.student[0].gid = '';
              this.gid_list = [];
              this.grouplist = [];
              this.nodeservice.updategid("")
              this.student[0].id = 0;
              this.student[0].gid = '';
              this.student[0].name = '';
              this.student[0].father = '';
              this.student[0].surname = '';
              this.student[0].room = '';
              this.student[0].village = '';
              this.student[0].cup_no = '';
              this.student[0].std = '';
              this.nodeservice.updategid('');
              this.entryModel.area = 'Select';
              this.entryModel.place = 'Select';
              this.entryModel.permission = 'Select';
              this.entryModel.reason = 'Select';
              this.entryModel.reason = 'Select';
              this.entryModel.with = 'Self';
              this.nodeservice.updategid('');
              this.errors.area_error = false;
              this.errors.place_error = false;
              this.errors.reason_error = false;
              this.errors.permission_error = false;
              this.errors.return_time_error = false;
              this.errors.with_error = false;
              this.errors.with_name_error = false;
              this.errors.with_number_error = false;
              this.gidloader = false
            }
          });
        });
      }
    }
  }
}
