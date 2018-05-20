import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list-element',
  templateUrl: './movie-list-element.component.html',
  styleUrls: ['./movie-list-element.component.css']
})
export class MovieListElementComponent {
  @Input() element: any;

  constructor() { }

}
