import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserInterface} from '../login/user.interface';
import { HttpClient } from '@angular/common/http';
import {HttpModule, Http, Response} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = User.getUser();
  myData: any[] = [];

  constructor(private http: HttpClient) {
    this.user = User.getUser();
  }

  ngOnInit() {

  }


  login(email: HTMLInputElement, password: HTMLInputElement): void {
    this.user.email = email.value;
    this.user.password = password.value;
    this.sendCredential(this.user.email, this.user.password);
  };

  sendCredential(mail: string, pwd: string) {
    var data = {
      email: mail,
      password: pwd
    }

    var headers  = new HttpHeaders();
    //headers.append('Accept','application/json');
    //headers.append('Content-Type','application/json');

    this.http
    .post('https://arcane-escarpment-45624.herokuapp.com/api/login', data, {headers})
    .subscribe((data : any) => {
      console.log(data.data.api_token);

      this.user.id = data.data.id;
      this.user.name = data.data.name;
      this.user.email = data.data.email;
      this.user.api_token = data.data.api_token;
      this.user.loggedIn = true;
    },err => {
        console.log("login failed");
      }
    );
  }

}
