import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserRegistrationService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = []

  constructor(
    public router: Router,
    public fetchApiData: UserRegistrationService,

  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {

    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
    });

  }

}
