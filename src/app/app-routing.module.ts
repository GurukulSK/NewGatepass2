import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatepassComponent } from './Components/Registration/gatepass/gatepass.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { GroupGatepassComponent } from './Components/Registration/group-gatepass/group-gatepass.component';
import { SabhaComponent } from './Components/sabha/sabha.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },


  {
    path:"",
    redirectTo:"registration",
    pathMatch:"full"
  },
  {
    path:"registration",
    children:[
      {
        path:"",
        component:GatepassComponent
      },
      {
        path:"Group-Gatepass",
        component:GroupGatepassComponent
      },
      {
        path:"sabha",
        component:SabhaComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:false,useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
