import { ApiService } from '../services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  length: number;
  loading = false;
  options: string[];
  pageIndex = 0;
  query = new FormControl();
  results: any[] = [];
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

  onSearchSubmit(event: Event) {
    event.preventDefault();
    this.getResults();
  }

  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.getResults();
  }

  getResults() {
    this.loading = true;
    this.api$.search(this.query.value, `${this.pageIndex + 1}`)
      .subscribe((response: any) => {
        this.loading = false;
        this.results = response.results;
        this.totalPages = response.total_pages;
        this.length = response.total_results;
      });
  }

  onQueryInput() {
    this.api$.search(this.query.value).subscribe(res => {
      this.options = res.results.map(el => el.title);
    });
  }

  autoCompleteSelected(event: MatAutocompleteSelectedEvent) {
    this.query.setValue(event.option.value);
    this.getResults();
  }
}
