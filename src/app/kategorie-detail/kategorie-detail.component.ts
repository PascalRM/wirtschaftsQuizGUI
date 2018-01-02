import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Kategorie } from '../kategorie.model';
import { UserInterface } from '../login/user.interface';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { KategorieDetail } from '../kategorie_detail.model';
import { Fragebogen } from '../fragebogen.model';

@Component({
  selector: 'app-kategorie-detail',
  templateUrl: './kategorie-detail.component.html',
  styleUrls: ['./kategorie-detail.component.css']
})
export class KategorieDetailComponent implements OnInit {
  kategorieDetail: KategorieDetail;
  fragebogen: Fragebogen[] = [];
  username: string = "";
  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.kategorieDetail = KategorieDetail.kategorieDetail;
  }

  ngOnInit() {
    if (this.kategorieDetail.id_kategorie != null) {
      this.getFragebogen();
    } else {
      this.redirectKategorie();
    }
  }


  getFragebogen() {
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/kategorie_fragebogen/' + this.kategorieDetail.id_kategorie)
      .subscribe(async (data: any) => {
        data.forEach(element => {
          let fragebog = new Fragebogen();
          fragebog.id = element.id;
          fragebog.name = element.name;
          fragebog.id_kategorie = element.id_kategorie;
          fragebog.id_user = element.id_user;
          this.fragebogen.push(fragebog);
          console.log(this.fragebogen);
        });
      }, err => {
        console.log("failed");
      }
      );
  }

  redirectKategorie() {
    this.router.navigateByUrl("/kategorie");
  }

  getUserInfo(id: number): string {
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/userinfo/' + id)
      .subscribe(async (data: any) => {
        this.username = data.name;
        console.log("username. " + this.username);
      }
      );

    return this.username;
  }


}
