import { IProfile } from '../../../../models/profile.model';
import { WEB3 } from '../../../../web3';
import { Component, OnInit, Inject } from '@angular/core';
import { ThreeBox } from '../../../../3box/3box.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as Box from '3box';
import { IBadge } from 'src/app/models/badge.model';

@Component({
  selector: 'app-show-awards',
  templateUrl: './show-awards.component.html',
  styleUrls: ['./show-awards.component.css']
})
export class ShowAwardsComponent implements OnInit {
  badge: IBadge;
  constructor(
    @Inject(WEB3) private web3,
    private threebox: ThreeBox,
    private router: Router
  ) {}

  async ngOnInit() {
    if ((window as any).ethereum) {
      const addresses = await (window as any).ethereum.enable();
      console.log('{}', addresses[0], (window as any).ethereum);
      // const allSpaces = await Box.listSpaces(address);
      // Get the current accounts in our provider
      let accounts = await this.web3.eth.getAccounts();
      accounts = accounts.map((account: string) => account.toLowerCase());

      const box = await this.threebox.openBox(accounts[0]);
      // console.log(await this.threebox.getProfile(accounts[0]));
      const badgesSpace = await box.openSpace(`${accounts[0]}_badges`);

      const allBadges = await badgesSpace.public.all();
      console.log(allBadges);

      const badgeId = window.location.pathname.split('/')[2];
      // const all = await Box.getSpace(accounts[0], `${accounts[0]}_badges`);
      // console.log(all);
      const badge = JSON.parse(allBadges[badgeId]);
      // console.log(allBadges, badge);
      this.badge = badge;
    } else {
      this.router.navigate(['/not-used']);
    }
  }
}
