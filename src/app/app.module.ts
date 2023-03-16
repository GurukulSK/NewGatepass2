import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { TostsComponent } from './Components/widget/tosts/tosts.component';
import { LoadderComponent } from './Components/widget/loadder/loadder.component';
import { GatepassComponent } from './Components/Registration/gatepass/gatepass.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './Components/widget/top-bar/top-bar.component';
import { HomeComponent } from './Components/home/home.component';
import { NavBarComponent } from './Components/widget/nav-bar/nav-bar.component';
import { NavTopBarComponent } from './Components/widget/nav-top-bar/nav-top-bar.component';
import { IcpnInputComponent } from './Components/widget/icpn-input/icpn-input.component';
import { NormalInputComponent } from './Components/widget/normal-input/normal-input.component';
import { SelectBoxComponent } from './Components/widget/select-box/select-box.component';
import { ButtonComponent } from './Components/widget/button/button.component';
import { GroupGatepassComponent } from './Components/Registration/group-gatepass/group-gatepass.component';
import { NumberFormatPipe } from './pipe/number-format.pipe';
import { OtpVeryfingBoxComponent } from './Components/Registration/otp-veryfing-box/otp-veryfing-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LottieModule } from 'ngx-lottie';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SabhaComponent } from './Components/sabha/sabha.component';
import { AdminComponent } from './Components/admin/admin.component';
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TostsComponent,
    LoadderComponent,
    GatepassComponent,
    TopBarComponent,
    HomeComponent,
    NavBarComponent,
    NavTopBarComponent,
    IcpnInputComponent,
    NormalInputComponent,
    SelectBoxComponent,
    ButtonComponent,
    GroupGatepassComponent,
    NumberFormatPipe,
    OtpVeryfingBoxComponent,
    SabhaComponent,
    AdminComponent,
  ],
  imports: [
    LottieModule.forRoot({ player: playerFactory }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
