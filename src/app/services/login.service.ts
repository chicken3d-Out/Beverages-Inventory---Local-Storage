import { Injectable } from '@angular/core';
import { Admin } from '../model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  admin: Admin[] =[]

  adminName!:String;

  constructor() { }

  auth(user:any){
    
    const records = localStorage.getItem('Admin');
    if(records !==null){
    this.admin = JSON.parse(records);
    }
    //Pass correct admin name
    this.admin.find((x:any) => {
      if(x.username === user.username){
        this.adminName = `${x.name}`;
      }
    })
    return this.admin.find(x => x.username === user.username && x.password === user.password);
  }



}
