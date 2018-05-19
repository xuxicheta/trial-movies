import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-detalis',
  templateUrl: './movie-detalis.component.html',
  styleUrls: ['./movie-detalis.component.css']
})
export class MovieDetalisComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private imgPrefix = 'https://image.tmdb.org/t/p/w300/';
  posterSrc: string;
  movie: any;
  cast: any[];

  constructor(
    private route: ActivatedRoute,
    private api$: ApiService,
  ) { }

  ngOnInit() {
    const route_sub = this.route.params.subscribe(params => {
      if (params.id) {
        this.api$.movie(params.id).subscribe((movie: any) => {
          this.movie = movie;
          this.posterSrc = this.imgPrefix + movie.poster_path;
        });

        this.api$.credits(params.id).subscribe((credits: any) => {
          this.cast = credits.cast;
        });
      }
    });
    this.subscription.add(route_sub);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
