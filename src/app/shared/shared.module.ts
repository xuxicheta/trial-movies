
import { CommonModule } from '@angular/common';
import { FavoriteStarComponent } from './favorite-star/favorite-star.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { MovieListElementComponent } from './movie-list-element/movie-list-element.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
  ],
  exports: [
    FavoriteStarComponent,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MovieListElementComponent,
  ],
  declarations: [
    FavoriteStarComponent,
    MovieListElementComponent,
  ],
})
export class SharedModule { }
