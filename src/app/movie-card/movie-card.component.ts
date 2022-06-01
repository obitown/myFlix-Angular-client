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

  /**
   * get users details
   * @returns Users Info in JSON format
   * @function getUser
   */
  getUser(): void {
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((resp: any) => {
        this.user = resp
        return this.user;
      })
    }
  }

  /**
   * gets list of ALL movies
   * @returns all movies
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.getMovies;
    })
  }

  /**
   * dispalys Genre information of selected movie
   * @param name {string}
   * @param description {string}
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name, description },
      width: '550px'
    })
    this.snackBar.open(`${name} card opened`, 'OK', {
      duration: 2000,
    })
  }

  /**
   * dispalys Director information of selected movie
   * @param name {string}
   * @param bio {string}
   * @param birth {string}
   */
  openDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name, bio, birth },
      width: '550px'
    })
    this.snackBar.open(`${name} card opened`, 'OK', {
      duration: 2000,
    })
  }

  /**
   * dispalys Synopsis information of selected movie
   * @param title {string}
   * @param description {string}
   */
  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title, description },
      width: '550px'
    })
    this.snackBar.open(`${title} synopsis opened`, 'OK', {
      duration: 2000,
    })
  }

  /**
   * adds movie to users favorite list
   * @function addFavoriteMovies
   * @param id {string}
   * @returns movie object in JSON format
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`Movie ADDED to favorites.`, 'OK', {
        duration: 2000,

      });

      this.ngOnInit();
    });
  }

  /**
   * deletes movie from users favorite list
   * @function deleteFavoriteMovies
   * @param id {string}
   * @returns updated FavoriteMovie list in JSON format
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((resp: any) => {
      this.snackBar.open(`Movie REMOVED from favorites.`, 'OK', {
        duration: 2000,
      })
      this.ngOnInit();
    })
  }

  /**
   * gets users favorite movies
   * @function getFavoriteMovies
   * @returns users FavoriteMovies in JSON format
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      const favs = this.movies.filter(x => resp.includes(x._id));
      this.favMovies = favs;
    })

  }

}
