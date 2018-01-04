import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserInterface } from '../login/user.interface';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginResultat: string;
  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.user = User.user;
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

    let user: User = new User();

    var headers = new HttpHeaders();
    //headers.append('Accept','application/json');
    //headers.append('Content-Type','application/json');

    this.http
      .post('https://arcane-escarpment-45624.herokuapp.com/api/login', data, { headers })
      .subscribe((data: any) => {
        console.log(data.data.api_token);

        user.id = data.data.id;
        user.name = data.data.name;
        user.email = data.data.email;
        user.api_token = data.data.api_token;
        user.loggedIn = true;
      }, err => {
        console.log("login failed");
        this.loginResultat = "Email oder Password falsch";
      }, () => {
        this.user = user;
        User.user = user;

        this.redirect();
      }
      );
  }

  redirect() {
    this.router.navigateByUrl("/konto");
  }
}
