import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-used',
  styleUrls: ['./not-used.component.css'],
  template: `
    <div class="not-used">
      <div class="container">
        <div class="guy">
          <div class="eye"></div>
          <div class="eye"></div>
          <div class="mouth"></div>
          <div class="arm"></div>
          <div class="arm"></div>
        </div>
        <div class="trajectory">
          <div class="curtain"></div>
        </div>
        <div class="table">
          <div class="legs"></div>
        </div>
      </div>
      <div class="typewriter">
        <h1>Please Download Extension Metamask.</h1>
      </div>
    </div>
  `
})
export class NotUsedComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
