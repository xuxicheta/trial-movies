import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorite-star',
  templateUrl: './favorite-star.component.html',
  styleUrls: ['./favorite-star.component.css']
})
export class FavoriteStarComponent implements OnInit, OnChanges {
  @Input() id: number;
  isFavorite: boolean;

  constructor(
    private favorites$: FavoritesService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.isFavorite = this.favorites$.isInFavor(this.id);
  }

  add() {
    this.favorites$.add(this.id);
    this.isFavorite = true;
  }
  remove() {
    this.favorites$.remove(this.id);
    this.isFavorite = false;
  }

}
