import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private _DataService: DataService) { }

  data: any = {};
  loading = true;
  ngOnInit() {

    this._DataService.generateToken(this.getCode())
      .subscribe((data) => {
        this._DataService.setToken(data);
        this._DataService.getUserInfo().subscribe((userData) => {
          console.log(userData);
          this.data = userData;
          this.loading = false;
        });
      });
  }

  getCode() {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }

}
