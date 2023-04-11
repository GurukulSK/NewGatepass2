import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { DatePipe } from '@angular/common';
import { Observable, timeout } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // ApiUrl = 'http://10.10.10.205:7018/api';
  ApiUrl = 'http://localhost:7018/api';

  // NodeApi = 'http://10.10.10.205:3000';
  NodeApi = 'http://localhost:3000';
  constructor(private http: HttpClient) { }



  Getpunch() {
    return this.http.get(this.NodeApi + '/getpunch').pipe(timeout(9900));
  }
  ReturnMessage(body: any) {
    return this.http.post(this.NodeApi + '/delmes', body);
  }
  GetStudentDataForGatepass(gid: number) {
    return this.http.get(this.ApiUrl + '/Student/' + gid + '');
  }
  ChekGatePass(gid: number) {
    return this.http.get(this.ApiUrl + '/Gatepass/ChekReturn/' + gid + '');
  }
  GetStudentDetails(gid: number) {
    return this.http.get(this.ApiUrl + '/Gatepass/Get/' + gid + '');
  }
  GatepassReturn(body: any) {
    return this.http.put(this.ApiUrl + '/Gatepass/Return', body);
  }
  GatepassEntry(body: any) {
    return this.http.post(this.ApiUrl + '/Gatepass/Entry', body);
  }
  GanaretOtp(gid: any) {
    return this.http.get(this.ApiUrl + '/Otp/' + gid);
  }
  VerifyOtp(body: any) {
    return this.http.post(this.ApiUrl + '/Otp', body);
  }
  getRegularList(gid: any) {
    return this.http.get(this.ApiUrl + '/Gatepass/GetRegularList/' + gid);
  }
  getAreaList() {
    return this.http.get(this.ApiUrl + '/Gatepass/GetAreas');
  }
  getPlaceList() {
    return this.http.get(this.ApiUrl + '/Gatepass/GetPlaces');
  }
  getReasonList() {
    return this.http.get(this.ApiUrl + '/Gatepass/GetReason');
  }
  Sendmessage(body: Object) {
    return this.http.post(this.NodeApi + '/sendTelegram', body);
  }
  Sabha = "http://localhost:8080/api/sabha/"
  GetStudent(gid: number) {
    return this.http.post(this.Sabha + "getdatabyid", { gid: gid })
  }
  SabhaStatus(gid: number) {
    return this.http.post(this.Sabha + "chekstatus", { gid: gid })
  }
  SabhaEntry(body: any) {
    return this.http.post(this.Sabha + "storedata", body)
  }

  chekBlock(gid:any){
    return this.http.post("http://localhost:8080/chekblock",{gid:gid})
  }

}
