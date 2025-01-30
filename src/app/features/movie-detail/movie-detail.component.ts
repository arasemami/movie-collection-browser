import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-movie-detail',
  imports: [
    CommonModule,
    LoadingSpinnerComponent

  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  movieId: string | null = null;
  movie: any = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService  
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId) {
      this.fetchMovieDetails(this.movieId);
    }
  }
  
  fetchMovieDetails(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe(
      (data) => {
        this.movie = data;
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching movie details:', error);
        this.isLoading = false; 
      }
    );
  }


}
