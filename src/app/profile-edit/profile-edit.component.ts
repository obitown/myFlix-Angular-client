import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  @Input() userData: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
  }

  editUser(): void {
    console.log('test')
  }


}
