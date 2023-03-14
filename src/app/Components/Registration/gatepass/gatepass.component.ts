import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { Studentdata } from 'src/app/Model/studentdata';
import { NodeService } from '../../services/node.service';
import { GatepassEntry } from 'src/app/Model/GatepassEntryModel';
import { MatDialog } from '@angular/material/dialog';
import { OtpVeryfingBoxComponent } from '../otp-veryfing-box/otp-veryfing-box.component';
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
export interface DialogData {
  gid: string;
  name: string;
  otp: string;
  id: string;
}
@Component({
  selector: 'app-gatepass',
  templateUrl: './gatepass.component.html',
  styleUrls: ['./gatepass.component.scss'],
  providers: [DatePipe, GatepassEntry, errors],
})
export class GatepassComponent implements OnInit {
  date = new Date();
  Curtime: any;
  area_list: any;
  place_list: any;
  reason_list: any;
  error = false;
  regular = true;
  withbool = false;
  height: any;
  err: any;
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
    { with: 'Other' },
  ];
  EntryType = 'Regular';

  EntryTypeList = [{ type: 'Regular' }, { type: 'Special' }];
  authpersion = [
    { name: 'Suryakant Bhai' },
    { name: 'Jitendrabhai Jodhani' },
    { name: 'Ghanshyambhai Bhimani' },
    { name: 'Yogeshbhai Vegad' },
    { name: 'Tarunbhai Radadiya' },
  ];
  ReturnAuthpersion = [
    { name: 'Suryakant Bhai' },
    { name: 'Jitendrabhai Jodhani' },
    { name: 'Ghanshyambhai Bhimani' },
    { name: 'Yogeshbhai Vegad' },
    { name: 'Tarunbhai Radadiya' },
    { name: 'No permission' },
  ];
  gidloader = false;
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
  late_permission = 'Select';
  late_reasone?: string;
  late = false;
  g_time = '';
  commited_time = '';
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
  name: any;
  animal: any;
  loader_button: any;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    private datepipe: DatePipe,
    private nodeservice: NodeService,
    public entryModel: GatepassEntry,
    public errors: errors
  ) {
    this.Curtime = this.datepipe.transform(this.date, 'hh:mm a');


  }
  options: AnimationOptions = {
    path: '/assets/500-fingerprint-security-outline.json',
  }
  success_lottie: AnimationOptions = {
    path: '/assets/success_lottie.json',
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  refresh(){
    this.router.navigate(['login'],{skipLocationChange:true}).then(()=>{
      this.router.navigateByUrl('/registration')
    })
  }
  punch: any;
  fingerclick: any;
  FingerAnime = false
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
  ngOnInit() {
    // this.getpunch()
    this.api.getAreaList().subscribe((data) => {
      this.area_list = data
    })
    this.api.getPlaceList().subscribe((data) => {
      this.place_list = data
    })
    let date = new Date().getDate()
    this.api.getReasonList().subscribe((data) => {
      this.reason_list = data
    })
    setInterval(() => {
      this.date = new Date();
      this.Curtime = this.datepipe.transform(this.date, 'hh:mm a');
      this.entryModel.going_time = this.Curtime;
    }, 1000);
  }
  ngOnDestroy() {
    try {
      this.punch.unsubscribe()
    } catch {
      console.log("Can not unsubscribe gate pass request");
    }
    this.nodeservice.updategid("")
  }
  Entry: string = '';
  gid!: any;
  am_pm = 'AM';
  logdata(giis: any) {
    console.log(giis);
  }
  animat(height: string, err: boolean) {
    let eleref = document.getElementById('Forms') as HTMLElement;
    console.log(this.student[0].gid);

    if (eleref.style.height == "auto") {
    }
    else {
      eleref.style.height = height;
    }
    setTimeout(() => {
      eleref.style.height = err ? '0px' : 'auto';
      eleref.style.opacity = err ? '0' : '1';
      this.gidloader = false
    }, 400);
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
  dilogopend = false
  opencount = 0
  submitAnime = false
  TooLateReturn = false;
  gidd(gid: any) {
    let buttons = document.getElementsByClassName('EntryButton');
    if(buttons[0].classList.contains("active")){
      this.regular = true
      console.log("Chek Regular");

    }
    if (gid.length == 5) {
      this.gidloader = true
      this.loader_button = false
      this.height = '0px';
      this.err = false;
      //Cheking last Proccess
      if (localStorage.getItem(gid)) {
        let StorageItem = localStorage.getItem(gid);
        var dataStudent = JSON.parse((StorageItem!))
        console.log(dataStudent);

        if (this.dilogopend == false) {
          const dialogRef = this.dialog.open(OtpVeryfingBoxComponent, {
            data: {
              gid: dataStudent.gid[0],
              name: dataStudent.name,
              otp: '',
              id: dataStudent.id,
            },
            disableClose: true,
          });
          this.dilogopend = true;
          dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
              localStorage.removeItem(dataStudent.gid[0])
              this.api.GatepassEntry(dataStudent).subscribe((data) => {
                this.loader_button = false
                this.Entry = '';
                this.student[0].gid = '';
              });
            }
            else {
              this.loader_button = false
              this.opencount += 1
              if (this.opencount == 3) {
                localStorage.removeItem(dataStudent.gid[0])
              }
              this.Entry = '';
              this.student[0].gid = '';
            }
            this.dilogopend = false
          });
        }
      }
      else {
        this.api.ChekGatePass(gid).subscribe((data: any) => {
          console.log(data);
          if (data['message'] == 'False') {
            this.Entry = 'false';
            if (data['late'] == -1) {
              this.late = true;
              this.regular = false
            }
            else{
              this.late = false
            }
            this.api.GetStudentDetails(gid).subscribe((data: any) => {
              this.g_time = data.going_time;
              this.commited_time = data.commited_time;
              let DateReturn = this.datepipe.transform(data.date, "dd-MM-yy")
              console.log(Date);
              let now_date = this.datepipe.transform(new Date(), "dd-MM-yy")
              if (DateReturn! > now_date!) {
                this.TooLateReturn = true
              }
              else{
                this.TooLateReturn=false
              }
            });
            this.height = '430px';
          }
          else {
            this.Entry = 'true';
            this.height = '680px'
          }
        });
        this.api.GetStudentDataForGatepass(gid).subscribe((data: any) => {
          if (data.id == 0) {
            this.nodeservice.error_set('Invalid GID', 'error');
            this.height = '0px';
            this.err = true;
          } else {
            this.nodeservice.updategid(data.url);
            this.student[0].img = data.url
            this.student[0].id = data.id;
            this.student[0].gid = data.gid;
            this.student[0].name = data.name;
            this.student[0].father = data.father;
            this.student[0].surname = data.surname;
            this.student[0].room = data.room;
            this.student[0].village = data.village;
            this.student[0].cup_no = data.cup_no;
            this.student[0].std = data.stndard;
            if (this.regular) {
              this.api.getRegularList(this.student[0].gid).subscribe((data: any) => {
                if (data.place.length == 0) {
                  this.place_list= data.place;
                  this.area_list = data.area;
                  this.nodeservice.error_set('You are not regular student', 'warning');
                } else {
                  this.place_list= data.place;
                  this.area_list = data.area;
                  this.entryModel.reason = 'Study';
                  this.entryModel.place = data.place[0].place;
                  this.entryModel.area = data.area[0].area ;
                  this.entryModel.permission = "Suryakant Bhai"
                }
              });
            }
          }
        });
        setTimeout(() => {
          this.animat(this.height, this.err);
        }, 200);
      }
    }
    else {
      this.Entry = '';
      this.gidloader = false
      this.loader_button = false
      this.student[0].id = 0;
      this.student[0].gid = '';
      this.student[0].name = '';
      this.student[0].father = '';
      this.student[0].surname = '';
      this.student[0].room = '';
      this.student[0].village = '';
      this.student[0].cup_no = '';
      this.student[0].std = '';
      this.entryModel.area = 'Select';
      this.entryModel.place = 'Select';
      this.entryModel.permission = 'Select';
      this.entryModel.reason = 'Select';
      this.entryModel.reason = 'Select';
      this.entryModel.with = 'Self';
      this.nodeservice.updategid('');
      this.errors.area_error = false
      this.errors.place_error = false
      this.errors.reason_error = false
      this.errors.permission_error = false
      this.errors.return_time_error = false
      this.errors.with_error = false
      this.errors.with_name_error = false
      this.errors.with_number_error = false
      this.api.getAreaList().subscribe(data=>{
        this.area_list = data
      })
      this.api.getPlaceList().subscribe(data=>{
        this.place_list = data
      })
    }
  }
  withChangeSelect(value: any) {
    if (value != "Select") {
      this.withbool = true
    }
    else {
      this.withbool = false
    }
    this.entryModel.with = value
  }
  EntryChek(chek: any) {
    let buttons = document.getElementsByClassName('EntryButton');
    if (chek == 'r') {
      buttons[0].classList.add("active")
      buttons[1].classList.remove("active")
      this.regular = true;
      this.api.getRegularList(this.student[0].gid).subscribe((data: any) => {
        if (data.place.length == 0) {
          this.nodeservice.error_set('You are not regular student', 'warning');
          this.entryModel.place = "Select";
          this.entryModel.area = "Select";
          this.place_list= data.place;
          this.area_list = data.area;
          this.entryModel.reason = 'Study';
          this.entryModel.permission = 'Suryakant Bhai';
        }
        else {
          this.place_list= data.place;
          this.area_list = data.area;
          this.entryModel.place = data.place[0].place;
          this.entryModel.area = data.area[0].area ;
          this.entryModel.reason = 'Study';
          this.entryModel.permission = 'Suryakant Bhai';
        }
      });
    }
    if (chek == 's') {
      buttons[0].classList.remove("active")
      buttons[1].classList.add("active")
      this.api.getAreaList().subscribe(data=>{
        this.area_list = data
      })
      this.api.getPlaceList().subscribe(data=>{
        this.place_list = data
      })
      this.regular = false;
    }
    // for (let i = 0; i < buttons.length; i++) {
    //   const ele = buttons[i];
    //   ele.classList.toggle('active');
    // }
  }
  entry() {
    if (this.loader_button) {
      return;
    }
    let em = this.entryModel;
    this.errors.area_error = em.area == 'Select' || em.area == "" ? true : false;
    this.errors.place_error = em.place == 'Select' || em.place == "" ? true : false;
    this.errors.reason_error = em.reason == 'Select' || em.reason == "" ? true : false;
    this.errors.return_time_error = em.return_time_mm == undefined ? true : false;
    this.errors.return_time_error = em.return_time_hh == undefined ? true : false;
    this.errors.permission_error = em.permission == 'Select' || em.permission == "" ? true : false;
    if (em.with != 'Select' && em.with != 'Self') {
      this.errors.with_error = em.with == 'Select' || em.with == "" ? true : false;
      this.errors.with_name_error = em.with_name == undefined ? true : false;
      this.errors.with_number_error = em.with_number == undefined ? true : false;
      return
    }
    if (em.return_time_hh.toString() == "" || em.return_time_mm.toString() == "" || em.return_time_mm > 59 || em.return_time_hh > 12 || em.return_time_hh == 0) {
      this.errors.return_time_error = true;
      return
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
        let id;
        this.api.GanaretOtp(this.student[0].gid).subscribe((data: any) => {
          id = data.verify_id
          if (id != 0) {
            // this.nodeservice.error_set("Otp ganreted succesfully", "success")
          }
          const dialogRef = this.dialog.open(OtpVeryfingBoxComponent, {
            data: {
              gid: this.student[0].gid,
              name: this.student[0].name,
              otp: '',
              id: id,
            },
            disableClose: true,
          });
          let body = {
            gid: [this.student[0].gid],
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
            date: new Date().getDate(),
            id: id,
            otp: ''
          };
          localStorage.setItem(this.student[0].gid, JSON.stringify(body))

          dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
              localStorage.removeItem(this.student[0].gid)
              let body = {
                gid: [this.student[0].gid],
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
                let stu = this.student[0]
                let em = this.entryModel
                let NewDate = this.datepipe.transform(new Date(),'dd-MM-yyyy')
                let ReturnTime = em.return_time_hh+":"+em.return_time_mm+" "+em.return_time_am_pm

                if(this.withbool){
                  let message = {
                    gid:this.student[0].gid,
                    mes : `${stu.name} ${stu.surname} \nGID - ${this.student[0].gid}\nStd. - ${stu.std}\n\nGoing to  - ${em.place}\nArea - ${em.area}\nReason - ${em.reason}\n\nDate - ${NewDate}\nTime - ${this.Curtime}\nExpected Return Time - ${ReturnTime}\n\nWith - ${em.with}\nWith Name - ${em.with_name}\nWith Number - ${em.with_number}\n\n Permission - ${em.permission}`
                  }
                  this.api.Sendmessage(message).subscribe((data) => {
                  });

                }
                else{
                  let message = {
                    gid:this.student[0].gid,
                    mes : `${stu.name} ${stu.surname} \nGID - ${this.student[0].gid}\nStd. - ${stu.std}\n\nGoing to  - ${em.place}\nArea - ${em.area}\nReason - ${em.reason}\n\nDate - ${NewDate}\nTime - ${this.Curtime}\nExpected Return Time - ${ReturnTime}\n\n Permission - ${em.permission}`
                  }
                  this.api.Sendmessage(message).subscribe((data) => {
                  });
                }
                this.loader_button = false;
                this.submitAnime = true;
                this.FingerAnime = false;
                this.nodeservice.updategid("")
                this.Entry = '';
                this.gidloader = false
                this.loader_button = false
                this.student[0].id = 0;
                this.student[0].gid = '';
                this.student[0].name = '';
                this.student[0].father = '';
                this.student[0].surname = '';
                this.student[0].room = '';
                this.student[0].village = '';
                this.student[0].cup_no = '';
                this.student[0].std = '';
                this.entryModel.area = 'Select';
                this.entryModel.place = 'Select';
                this.entryModel.permission = 'Select';
                this.entryModel.reason = 'Select';
                this.entryModel.reason = 'Select';
                this.entryModel.with = 'Self';
                this.nodeservice.updategid('');
                this.errors.area_error = false
                this.errors.place_error = false
                this.errors.reason_error = false
                this.errors.permission_error = false
                this.errors.return_time_error = false
                this.errors.with_error = false
                this.entryModel.return_time_hh = 0
                this.entryModel.return_time_mm = 0
                this.errors.with_name_error = false
                this.errors.with_number_error = false
                this.api.getAreaList().subscribe(data=>{
                  this.area_list = data
                })
                this.api.getPlaceList().subscribe(data=>{
                  this.place_list = data
                })

                setTimeout(() => {
                  this.submitAnime = false;
                  this.FingerAnime = false;
                  this.refresh()
                }, 2000)
                this.Entry = '';
                this.student[0].gid = '';
              });
            }
            else {
              this.loader_button = false
              this.Entry = '';
              this.student[0].gid = '';
            }
          });
        });
      }
      if (this.regular) {
        let body = {
          gid: [this.student[0].gid],
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
          let stu = this.student[0]
          let em = this.entryModel
          let NewDate = this.datepipe.transform(new Date(),'dd-MM-yyyy')
          let ReturnTime = em.return_time_hh+":"+em.return_time_mm+" "+em.return_time_am_pm

          if(this.withbool){
            let message = {
              gid:this.student[0].gid,
              mes : `${stu.name} ${stu.surname} \nGID - ${this.student[0].gid}\nStd. - ${stu.std}\n\nGoing to  - ${em.place}\nArea - ${em.area}\nReason - ${em.reason}\n\nDate - ${NewDate}\nTime - ${this.Curtime}\nExpected Return Time - ${ReturnTime}\n\nWith - ${em.with}\nWith Name - ${em.with_name}\nWith Number - ${em.with_number}\n\n Permission - ${em.permission}`
            }
            this.api.Sendmessage(message).subscribe((data) => {
            });

          }
          else{
            let message = {
              gid:this.student[0].gid,
              mes : `${stu.name} ${stu.surname} \nGID - ${this.student[0].gid}\nStd. - ${stu.std}\n\nGoing to  - ${em.place}\nArea - ${em.area}\nReason - ${em.reason}\n\nDate - ${NewDate}\nTime - ${this.Curtime}\nExpected Return Time - ${ReturnTime}\n\n Permission - ${em.permission}`
            }
            this.api.Sendmessage(message).subscribe((data) => {
            });
          }
          this.loader_button = false
          this.Entry = '';
          this.student[0].gid = '';
          this.submitAnime = true;
          this.FingerAnime = false;
          this.Entry = '';
          this.gidloader = false
          this.loader_button = false
          this.student[0].id = 0;
          this.student[0].gid = '';
          this.student[0].name = '';
          this.student[0].father = '';
          this.student[0].surname = '';
          this.student[0].room = '';
          this.student[0].village = '';
          this.student[0].cup_no = '';
          this.student[0].std = '';
          this.entryModel.area = 'Select';
          this.entryModel.place = 'Select';
          this.entryModel.permission = 'Select';
          this.entryModel.reason = 'Select';
          this.entryModel.reason = 'Select';
          this.entryModel.with = 'Self';
          this.nodeservice.updategid('');
          this.errors.area_error = false
          this.errors.place_error = false
          this.errors.reason_error = false
          this.errors.permission_error = false
          this.errors.return_time_error = false
          this.errors.with_error = false
          this.errors.with_name_error = false
          this.errors.with_number_error = false
          this.entryModel.return_time_hh = 0
          this.entryModel.return_time_mm = 0
          this.nodeservice.updategid("")
          this.api.getAreaList().subscribe(data=>{
            this.area_list = data
          })
          this.api.getPlaceList().subscribe(data=>{
            this.place_list = data
          })
          setTimeout(() => {
            this.submitAnime = false;
            this.FingerAnime = false;
            this.refresh()
          }, 2000)
      })

      }
    }
  }
  late_select_error = false;
  late_reasone_error = false;
  return() {
    let body = {};
    if (this.late) {
      if (this.late_permission == 'Select') {
        this.nodeservice.error_set('Permission for Late is Required', 'warning');
        this.late_select_error = true;
        this.late_reasone_error = false;
        return
      }
      else {
        if (this.late_reasone == '' || this.late_reasone == undefined) {
          this.nodeservice.error_set('Reason for Late is Required', 'warning');
          this.late_select_error = false;
          this.late_reasone_error = true;
          return
        }
        else {
          body = {
            gid: this.student[0].gid,
            late_permission: this.late_permission,
            late_reason: this.late_reasone,
          };
        }
      }
    }
    else {
      body = {
        gid: this.student[0].gid,
      };
    }
    let id;
    // console.log(body);
    if (this.TooLateReturn) {

      this.api.GanaretOtp(this.student[0].gid).subscribe((data: any) => {
        id = data.verify_id
        if (id != 0) {
          // this.nodeservice.error_set("Otp ganreted succesfully", "success")
        }
        const dialogRef = this.dialog.open(OtpVeryfingBoxComponent, {
          data: {
            gid: this.student[0].gid,
            name: this.student[0].name,
            otp: '',
            id: id,
          },
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          console.log(result);
          if (result) {
            this.api.GatepassReturn(body).subscribe((data) => {
              body ={
                gid: this.student[0].gid,
                late: this.late?"Yes":"No",
                time:this.Curtime
              }
              this.api.ReturnMessage(body).subscribe((data)=>{})
              this.student[0].gid = '';
              this.Entry = '';
              this.loader_button = false
              this.submitAnime = true;
              this.FingerAnime = false;
              this.late_permission = "Select"
              this.late_reasone = ""
              this.late_select_error = false;
              this.late_reasone_error = false;
              this.nodeservice.updategid("")
              setTimeout(() => {
                this.submitAnime = false;
                this.FingerAnime = false;
              }, 2000)
            });
          }
          else {
            this.loader_button = false
            this.Entry = '';
            this.student[0].gid = '';
          }
        });
      });

    }
    else{
      this.api.GatepassReturn(body).subscribe((data) => {
        body ={
          gid: this.student[0].gid,
          late: this.late?"Yes":"No",
          time:this.Curtime
        }
        this.api.ReturnMessage(body).subscribe((data)=>{})
        this.student[0].gid = '';
        this.Entry = '';
        this.loader_button = false
        this.submitAnime = true;
        this.FingerAnime = false;
        this.nodeservice.updategid("")
        this.late_permission = "Select"
        this.late_reasone = ""
        this.late_select_error = false;
        this.late_reasone_error = false;
        setTimeout(() => {
          this.submitAnime = false;
          this.FingerAnime = false;
        }, 2000)
      });
    }
  }
  cancle(){
    this.loader_button = false
    this.Entry = '';
    this.student[0].gid = '';
    this.FingerAnime = false;
    this.Entry = '';
    this.gidloader = false
    this.loader_button = false
    this.student[0].id = 0;
    this.student[0].gid = '';
    this.student[0].name = '';
    this.student[0].father = '';
    this.student[0].surname = '';
    this.student[0].room = '';
    this.student[0].village = '';
    this.student[0].cup_no = '';
    this.student[0].std = '';
    this.entryModel.area = 'Select';
    this.entryModel.place = 'Select';
    this.entryModel.permission = 'Select';
    this.entryModel.reason = 'Select';
    this.entryModel.reason = 'Select';
    this.entryModel.with = 'Self';
    this.nodeservice.updategid('');
    this.errors.area_error = false
    this.errors.place_error = false
    this.errors.reason_error = false
    this.errors.permission_error = false
    this.errors.return_time_error = false
    this.errors.with_error = false
    this.errors.with_name_error = false
    this.entryModel.return_time_hh = 0
    this.entryModel.return_time_mm = 0
    this.errors.with_number_error = false
    this.nodeservice.updategid("")


  }
}
