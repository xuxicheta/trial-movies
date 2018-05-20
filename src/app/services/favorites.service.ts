import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favs$ = new BehaviorSubject<number[]>([]);
  private favs: number[];
  private _map = new Map();

  constructor(
    private api$: ApiService,
  ) {
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
    this.favs.forEach(id => {
      const element = new BehaviorSubject<any>({});
      this._map.set(id, element);
      this.api$.movie(id).subscribe(movie => element.next(movie));
    });
  }

  add(id: number) {
    this.favs.push(id);
    this.favs$.next(this.favs);

    const element = new BehaviorSubject<any>({});
    this._map.set(id, element);
    this.api$.movie(id).subscribe(movie => element.next(movie));
    this.save();
  }

  remove(id: number) {
    const index = this.favs.indexOf(id);
    if (index !== -1) {
      this.favs.splice(index, 1);
      this.favs$.next(this.favs);
      this._map.delete(id);
      this.save();
      return true;
    }
    return false;
  }
  getFavorites() {
    return this.favs$.asObservable();
  }
  getElement$(id: number) {
    return this._map.get(id);
  }
  isInFavor(id) {
    return this.favs.indexOf(id) !== -1;
  }


}
