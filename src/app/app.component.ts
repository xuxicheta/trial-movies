import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  query: string;
  result: any;
  error: any;

  constructor(
  ) {}

  ngOnInit() {
  }
}
