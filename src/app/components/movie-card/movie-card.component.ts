import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchlistButtonComponent } from '../watchlist-button/watchlist-button.component';

@Component({
  selector: 'app-movie-card',
  imports: [
    CommonModule,
    RouterLink,
    WatchlistButtonComponent
  ],
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie: any;
  @Input() watchlist: any[] = [];

  constructor() { }





}
