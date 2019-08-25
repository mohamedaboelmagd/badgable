import { IProfile } from './models/profile.model';
import { WEB3 } from './web3';
import { Component, OnInit, Inject } from '@angular/core';
import { ThreeBox } from './3box/3box.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(WEB3) private web3,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    console.log();
    if ((window as any).ethereum && window.location.pathname.length < 10) {
      console.log('{c}', (window as any).ethereum.selectedAddress);
      this.router.navigate([`/${(window as any).ethereum.selectedAddress}`]);
    } else if (!(window as any).ethereum) {
      this.router.navigate(['/not-used']);
    }
  }
}
