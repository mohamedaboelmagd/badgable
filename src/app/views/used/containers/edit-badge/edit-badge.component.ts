import { FormControl, FormGroup } from '@angular/forms';
import { IProfile } from '../../../../models/profile.model';
import { WEB3 } from '../../../../web3';
import { Component, OnInit, Inject } from '@angular/core';
import { ThreeBox } from '../../../../3box/3box.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as Box from '3box';
import { IBadge } from 'src/app/models/badge.model';

@Component({
  selector: 'app-edit-badge',
  templateUrl: './edit-badge.component.html',
  styleUrls: ['./edit-badge.component.css']
})
export class EditBadgeComponent implements OnInit {
  badge: IBadge;
  badgeForm: FormGroup;
  constructor(
    @Inject(WEB3) private web3,
    private threebox: ThreeBox,
    private router: Router
  ) {}

  async ngOnInit() {
    this.badgeForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      photo: new FormControl('')
    });
    if ((window as any).ethereum) {
      // console.log('{orgId}', (window as any).ethereum.selectedAddress);
      const addresses = await (window as any).ethereum.enable();
      console.log('{}', addresses[0], (window as any).ethereum);
      // Get the current accounts in our provider
      let accounts = await this.web3.eth.getAccounts();
      accounts = accounts.map((account: string) => account.toLowerCase());

      const box = await this.threebox.openBox(accounts[0]);
      const badgesSpace = await box.openSpace(`${accounts[0]}_badges`);

      const allBadges = await badgesSpace.public.all();
      console.log(allBadges);
      // await badgesSpace.public.set(
      //   '40908323-d4f2-4c2e-a8f3-f58f93e34e72',
      //   JSON.stringify({
      //     description: 'zjxnjcn3',
      //     name: 'xmik3',
      //     photo: '',
      //     version: 1,
      //     orgId: '0xbfdc46b23d13c71cfb76c5b2d2f6e7b30150765c',
      //     created: 1566680066575,
      //     updates: ['33f6a7d6-9fc1-4b9a-943a-d3530e966d68_v1.0']
      //   })
      // );
      // await badgesSpace.public.set(
      //   latest.updates[0],
      //   JSON.stringify(latest)
      // );
      // const box = await this.threebox.openBox(accounts[0]);
      // const boxSyncPromise = new Promise((resolve, reject) => {
      //   console.log('sync');
      //   box.onSyncDone(resolve);
      // });

      const badgeId = window.location.pathname.split('/')[2];
      // const all = await Box.getSpace(accounts[0], `${accounts[0]}_badges`);
      const badge = JSON.parse(allBadges[badgeId]);
      this.badge = badge;
      this.badgeForm.get('name').setValue(this.badge.name);
      this.badgeForm.get('description').setValue(this.badge.description);
      this.badgeForm.get('photo').setValue(this.badge.photo);

      // const allSpaces = await Box.listSpaces(accounts[0]);
      // console.log(allSpaces, accounts[0]);
      // for (let index = 0; index < allSpaces.length; index++) {
      //   const space = allSpaces[index];
      //   console.log('{space}', space);
      //   console.log(await Box.getSpace(accounts[0], space));
      // }
    } else {
      this.router.navigate(['/not-used']);
    }
  }

  // async getFromSpace(address: string) {
  //   const badgeId = window.location.pathname.split('/')[2];
  //   const all = await Box.getSpace(address, `${address}_badges`);
  //   const badge = JSON.parse(all[badgeId]);
  //   console.log('{all}', all);
  // }

  changeImage($event) {
    console.log('{im}', $event);
    this.badgeForm.get('photo').setValue($event);
  }

  async onFormSubmit() {
    const badgeId = window.location.pathname.split('/')[2];

    await this.threebox.editBadge(
      ((window as any).ethereum.selectedAddress as string).toLowerCase(),
      badgeId,
      {
        ...this.badge,
        // description: 'zjxnjcn2',
        // name: 'xmik2',
        // photo: '',
        // version: 1,
        // orgId: '0xbfdc46b23d13c71cfb76c5b2d2f6e7b30150765c',
        // created: 1566680066575,
        // updates: ['33f6a7d6-9fc1-4b9a-943a-d3530e966d68_v1.0']
        name: this.badgeForm.get('name').value,
        description: this.badgeForm.get('description').value,
        photo: this.badgeForm.get('photo').value
      }
    );
    // const box = await this.threebox.openBox(
    //   ((window as any).ethereum.selectedAddress as string).toLowerCase()
    // );

    // const boxSyncPromise = new Promise((resolve, reject) => {
    //   console.log('sync');
    //   box.onSyncDone(resolve);
    // });
    // await this.getFromSpace(
    //   ((window as any).ethereum.selectedAddress as string).toLowerCase()
    // );
  }
}
