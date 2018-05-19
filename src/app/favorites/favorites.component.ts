import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  lib: any;
  favs: number[] = [];

  constructor(
    private favorites$: FavoritesService,
    private api$: ApiService,
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.favorites$.getFavorites().subscribe(favs => this.favs = favs),
    ); // favs
    this.subscription.add(
      this.favorites$.getLibrary().subscribe(lib => this.lib = lib)
    );
    this.favorites$.restore();
    this.favorites$.fetch();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
