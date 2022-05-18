import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRegistrationService } from '../fetch-api-data.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {}
  movies: any[] = []
  favMovies: any[] = []


  constructor(
    public router: Router,
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteMovies();
  }

  getUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp
        console.log(this.user);
        return this.user;
      })
    }
  }

  editProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '500px'
    })
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favMovies.push(movie)
          console.log(movie)
        }
      })
    })
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open('Movie Removed', 'OK', {
        duration: 3500,
      })
      this.ngOnInit();
    })

  }

}
