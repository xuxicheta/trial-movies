import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  query = new FormControl();
  results: any[] = [];
  options: string[];
  page: number;
  length: number;
  totalPages: number;

  constructor(
    private api$: ApiService,
  ) { }

  ngOnInit() {
    this.query.setValue(localStorage.getItem('query')); // get saved query
    this.subscription.add(
      this.query.valueChanges.subscribe(val => localStorage.setItem('query', val))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearchSubmit(event: any) {
    event.preventDefault();
    this.getResults();
  }

  onPage(event: any) {
    this.page = event.pageIndex + 1;
    this.getResults();
  }

  getResults() {
    this.api$.search(this.query.value, `${this.page}`)
      .subscribe((response: any) => {
        this.results = response.results;
        this.page = response.page;
        this.totalPages = response.total_pages;
        this.length = response.total_results;
      });
  }

  onQueryInput() {
    this.api$.search(this.query.value).subscribe(res => {
      this.options = res.results.map(el => el.title);
    });
  }

}
