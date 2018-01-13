import {
  Component, OnInit,
  Input
} from '@angular/core';
import { UserInterface } from '../login/user.interface';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(private location: Location, private router: Router) { 
    this.user = User.user;
  }

  ngOnInit() {
  }

  routeLogin(){
    this.router.navigateByUrl("/login");
  }

  routeRegistrieren(){
    this.router.navigateByUrl("/registrieren");
  }

  routeQuiz(){
    this.router.navigateByUrl("/kategorie");
  }
}
