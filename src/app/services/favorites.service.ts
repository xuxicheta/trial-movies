import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private lib$ = new BehaviorSubject<any>({}); // map of favorites
  private lib: any;
  private favs$ = new BehaviorSubject<number[]>([]);
  private favs: number[];

  constructor(
    private api$: ApiService,
  ) {
    this.lib$.subscribe(lib => this.lib = lib);
    this.favs$.subscribe(favs => this.favs = favs);
  }
  save() {
    localStorage.setItem('favorites', JSON.stringify(this.favs));
  }
  restore() {
    const favsData = localStorage.getItem('favorites');
    if (favsData) {
      this.favs$.next(JSON.parse(favsData));
    }
  }

  fetch() {
    this.favs.forEach(fav => {
      if (!this.lib[fav]) {
        this.api$.movie(fav).subscribe(movie => {
          this.lib[fav] = movie;
          this.lib$.next(this.lib);
        });
      }
    });
  }

  add(id: number) {
    this.favs.push(id);
    this.favs$.next(this.favs);
    this.fetch();
    this.save();
  }
  remove(id: number) {
    const index = this.favs.indexOf(id);
    if (index === -1) {
      return false;
    }
    this.favs.splice(index, 1);
    this.favs$.next(this.favs);
    this.save();
    return true;
  }
  getFavorites() {
    return this.favs$;
  }
  getLibrary() {
    return this.lib$;
  }
  isInFavor(id) {
    return this.favs.indexOf(id) !== -1;
  }


}
