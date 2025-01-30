import { Component } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [
    CommonModule,
    MovieCardComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies: any[] = [];

  constructor(private movieService: MovieService) {}


  ngOnInit() {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data.results;
    });
  }
}
