import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThreeBox } from 'src/app/3box/3box.service';

import { WEB3 } from '../../../../web3';

@Component({
  selector: 'app-add-badge',
  templateUrl: './add-badge.component.html',
  styleUrls: ['./add-badge.component.css']
})
export class AddBadgeComponent implements OnInit {
  badgeForm: FormGroup;
  constructor(@Inject(WEB3) private web3, private threebox: ThreeBox) {}

  ngOnInit() {
    console.log('{orgId}', (window as any).ethereum.selectedAddress);
    this.badgeForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      photo: new FormControl('')
    });
  }

  changeImage($event) {
    console.log('{im}', $event);
    this.badgeForm.get('photo').setValue($event);
  }

  async onFormSubmit() {
    const x = await this.threebox.addBadge(
      ((window as any).ethereum.selectedAddress as string).toLowerCase(),
      this.badgeForm.get('name').value,
      this.badgeForm.get('description').value,
      this.badgeForm.get('photo').value
    );
    console.log('{x}', x);
  }
}
