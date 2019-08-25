import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThreeBox } from 'src/app/3box/3box.service';

import * as csv from 'csvjson';
import { WEB3 } from '../../../../web3';

@Component({
  selector: 'app-add-award',
  templateUrl: './add-award.component.html',
  styleUrls: ['./add-award.component.css']
})
export class AddAwardComponent implements OnInit {
  badgeForm: FormGroup;
  file;
  constructor(@Inject(WEB3) private web3, private threebox: ThreeBox) {}

  ngOnInit() {
    console.log('{orgId}', (window as any).ethereum.selectedAddress);
    this.badgeForm = new FormGroup({
      file: new FormControl('')
    });
  }

  onChange(event) {
    const input = event.target;

    const reader = new FileReader();
    const that = this;
    reader.onload = function() {
      const text = reader.result;
      let node;
      node = document.getElementById('output');
      node.innerText = text;
      console.log((reader.result as string).substring(0, 200));
      that.file = text; // (reader.result as string).substring(0, 200);
      // that.badgeForm.get('file').setValue(reader.result as string);
    };
    reader.readAsText(input.files[0]);
  }
  async onFormSubmit() {
    console.log('submit', this.file);
    const badgeId = window.location.pathname.split('/')[2];
    const data = csv.toObject(this.file, {});
    // const data = await readFile(downloadPath);
    // await deleteFile(downloadPath);
    console.log(data);
    // return csv.toObject(data, {});

    const x = await this.threebox.addAwards(
      ((window as any).ethereum.selectedAddress as string).toLowerCase(),
      badgeId,
      data
      // awards: { name: string; note: string }[]
    );
    console.log('{x}', x);

    const box = await this.threebox.openBox(
      ((window as any).ethereum.selectedAddress as string).toLowerCase()
    );
    // console.log(await this.threebox.getProfile(accounts[0]));
    const badgesSpace = await box.openSpace(
      `${((window as any).ethereum
        .selectedAddress as string).toLowerCase()}_badges`
    );

    const allBadges = await badgesSpace.public.all();
    console.log(allBadges);
  }
}
