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
  movies: any[] = [];
  genres: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getGenre()
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.getMovies;
    })
  }

  getGenre(): void {
    this.fetchApiData.getGenre().subscribe((resp: any) => {
      this.genres = resp;
      console.log(this.genres);
      return this.getGenre;
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


}
