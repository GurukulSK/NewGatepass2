import { Component } from '@angular/core';
import { GroupEntry } from 'src/app/Model/GroupEntry';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-sabha',
  templateUrl: './sabha.component.html',
  styleUrls: ['./sabha.component.scss'],
})
export class SabhaComponent {

gidloader: boolean = false;
  loader_button: boolean = false;
removeList(_t17: number) {
throw new Error('Method not implemented.');
}
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
  GroupList = new GroupEntry()
  grouplist=[this.GroupList];
  constructor(private nodeservice:NodeService){}
    gidd(gid: any) {
      if(gid.length == 5){
        let student = new GroupEntry();
        student.gid=20018
        student.name="20018"
        student.suname="20018"
        student.std="20018"
        this.grouplist.push(student)
      }
  }
}
