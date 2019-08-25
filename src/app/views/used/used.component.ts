import { IProfile } from '../../models/profile.model';
import { WEB3 } from '../../web3';
import { Component, OnInit, Inject } from '@angular/core';
import { ThreeBox } from '../../3box/3box.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-used',
  template: `
    Used
    {{ profile | json }}
    <button routerLink="add">Add Badge</button>
  `,
  styles: []
})
export class UsedComponent implements OnInit {
  profile: IProfile;
  constructor(
    @Inject(WEB3) private web3,
    private threebox: ThreeBox,
    private router: Router
  ) {}

  async ngOnInit() {
    if ((window as any).ethereum) {
      const addresses = await (window as any).ethereum.enable();
      console.log('{}', addresses[0], (window as any).ethereum);
      // Get the current accounts in our provider
      let accounts = await this.web3.eth.getAccounts();
      accounts = accounts.map((account: string) => account.toLowerCase());
      // Wait to open a box
      const box = await this.openBox(accounts[0]);
      console.log('{box}', box);
      this.profile = (await this.getProfile(accounts[0])) as IProfile;
      console.log(this.profile.badges[0]);
      // getBadge
      await this.getBadge(accounts[0], this.profile.badges[0]);
    } else {
      this.router.navigate(['/not-used']);
    }
  }

  /** Open a box and update the current box open in the service */
  public openBox(address?: string) {
    return this.threebox.openBox(address);
  }

  /**
   * Get the profile of an address
   * @param address the address to get the profile from.
   */
  public async getProfile(address: string) {
    return await this.threebox.getProfile(address).then(profile => profile);
  }

  public async getBadge(address: string, badgeId: string) {
    return await this.threebox.getBadge(address, badgeId);
  }
}
