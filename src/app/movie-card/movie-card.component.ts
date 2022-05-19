import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  user: any = {}
  movies: any[] = [];
  genres: any[] = [];
  favMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.getMovies;
    })
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '550px'
    })
    this.snackBar.open(`${name} card opened`, 'OK', {
      duration: 2000,
    })
  }

  openDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birth },
      width: '550px'
    })
    this.snackBar.open(`${name} card opened`, 'OK', {
      duration: 2000,
    })
  }

  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title, description },
      width: '550px'
    })
    this.snackBar.open(`${title} synopsis opened`, 'OK', {
      duration: 2000,
    })
  }

  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`Movie ADDED to favorites.`, 'OK', {
        duration: 2000,

      });

      this.ngOnInit();
    });
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`Movie REMOVED from favorites.`, 'OK', {
        duration: 2000,
      })
      this.ngOnInit();
    })
  }

  getFavoriteMovies(): void {
    let movies: any[] = []
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

}
