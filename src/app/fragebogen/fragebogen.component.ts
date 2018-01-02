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
import { Frage } from '../frage.model';
import { FragebogenDetail } from '../fragebogen_detail.model';

@Component({
  selector: 'app-fragebogen',
  templateUrl: './fragebogen.component.html',
  styleUrls: ['./fragebogen.component.css']
})
export class FragebogenComponent implements OnInit {

  frage: Frage[] = [];
  fragebogen: Fragebogen = new Fragebogen();

  constructor(private http: HttpClient, private location: Location, private router: Router) {
    this.fragebogen = FragebogenDetail.fragebogenDetail.fragebogen;
  }

  ngOnInit() {
    this.load();
  }

  getFragen() {
    this.http
      .get('https://arcane-escarpment-45624.herokuapp.com/api/kategorie_fragebogen/' + this.fragebogen.id)
      .subscribe(async (data: any) => {
        data.forEach(element => {
          let frage = new Frage();

          this.frage.push(frage);
          console.log(this.fragebogen);
        });
      }, err => {
        console.log("failed");
      }
      );
  }



  load(){
    if(this.fragebogen == null){
      this.router.navigateByUrl("/kategorie");
    }else{

    }
  }
}
