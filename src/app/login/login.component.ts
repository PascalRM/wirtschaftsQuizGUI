import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = User.getUser();

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
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');

    this.http.post('https://arcane-escarpment-45624.herokuapp.com/api/login', data, {headers}).subscribe(data => {
      console.log(data);
    },err => {
        console.log("login failed");
      }
    );
  }
}
