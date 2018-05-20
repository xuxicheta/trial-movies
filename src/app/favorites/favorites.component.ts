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
  favs: number[] = [];

  constructor(
    private favorites$: FavoritesService,
    private api$: ApiService,
  ) { }

  ngOnInit() {
    this.favorites$.restore();
    this.favorites$.fetch();
    this.subscription.add(
      this.favorites$.getFavorites().subscribe(favs => this.favs = favs),
    ); // favs
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  element(id: number) {
    return this.favorites$.getElement$(id);
  }

}
