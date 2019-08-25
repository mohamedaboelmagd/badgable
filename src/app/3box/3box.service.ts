import { IAward } from './../models/award.model';
import { IBadge } from './../models/badge.model';
import * as Box from '3box';
import { Inject, Injectable } from '@angular/core';
import Web3 from 'web3';
import * as uuid from 'uuid/v4';

import { WEB3 } from '../web3';
import { BoxOptions, GetProfileOptions, Threebox as Three } from './3box';

// const Box = require('3box');
// } from '3box';
@Injectable({ providedIn: 'root' })
export class ThreeBox {
  constructor(@Inject(WEB3) private web3: Web3) {}

  /**
   * Opens the user space associated with the given address.
   * @param address An ethereum address.
   * @param options Optional parameters.
   * @returns The threeBox instance for the given address.
   */
  public async openBox(address?: string, options?: BoxOptions): Promise<Three> {
    if (!this.web3.currentProvider) {
      throw new Error('No web3 provider available');
    }
    if (!address && !this.web3.eth.defaultAccount) {
      throw new Error('Please provide an address');
    }
    if (address && !this.web3.utils.isAddress(address)) {
      throw new Error(`This is not a valid address: ${address}`);
    }
    try {
      return await Box.openBox(
        address || this.web3.eth.defaultAccount,
        (window as any).ethereum || this.web3.currentProvider,
        options
      );
    } catch (error) {
      console.log('err', error);
    }
  }

  /**
   * Get the public profile of a given address.
   * @param address An Ethereum address.
   * @param options Optional parameters.
   * @returns A json object with the profile for the given address.
   */
  public getProfile(
    address: string,
    options?: GetProfileOptions
  ): Promise<Object> {
    if (!this.web3.utils.isAddress(address)) {
      throw new Error(`This is not a valid address: ${address}`);
    }
    return Box.getProfile(address, options);
  }

  public async addBadge(address, name, description, photo) {
    const box = await this.openBox(address);
    const id = uuid() as string;
    const object = {
      description,
      name,
      photo,
      version: 1.0,
      orgId: address,
      created: Date.now(),
      updates: [`${id}_v1.0`]
    };

    console.log('{Box}', address, box);
    // update badges space
    const badgesSpace = await box.openSpace(`${address}_badges`);
    await badgesSpace.public.set(id, JSON.stringify(object));
    await badgesSpace.public.set(object.updates[0], JSON.stringify(object));

    // update profile
    const badges = ((await box.public.get('badges')) as string[]) || [];
    badges.push(id);
    console.log('set', id, badges);
    box.public.set('badges', badges);

    return { id, object };
  }

  public async getBadge(address: string, badgeId: string) {
    // const box = await this.openBox(address);
    // const allSpaces = await Box.listSpaces(address);
    // console.log(allSpaces, address);
    // for (let index = 0; index < allSpaces.length; index++) {
    //   const space = allSpaces[index];
    //   console.log('{space}', space);
    //   console.log(await Box.getSpace(address, space));
    // }
    const badgesSpace = await Box.getSpace(address, `${address}_badges`);
    console.log(badgesSpace);
  }

  public async editBadge(address: string, id: string, latest: IBadge) {
    console.log(address, id, latest);
    const box = await this.openBox(address);
    // const boxSyncPromise = new Promise((resolve, reject) => {
    //   console.log('sync');
    //   box.onSyncDone(resolve);
    // });
    latest.version = latest.version + 0.1;
    latest.updates.unshift(`${id}_v${latest.version}`);
    latest.updated = Date.now();

    const badgesSpace = await box.openSpace(`${address}_badges`);
    (window as any).space = badgesSpace;
    console.log(badgesSpace);

    console.log(id, JSON.stringify(latest));
    console.log(latest.updates[0], JSON.stringify(latest));
    // Update public space data
    await badgesSpace.public.set(id, JSON.stringify(latest));
    await badgesSpace.public.set(latest.updates[0], JSON.stringify(latest));
  }

  public async addAwards(
    address: string,
    badgeId,
    awards: { name: string; note: string }[]
  ) {
    console.log('{awards}', awards);
    const box = await this.openBox(address);

    const awardKeys = [];
    const awardObjects = [];
    const awardArchiveKeys = [];
    const awardArchiveObjects = [];

    for (const item of awards) {
      const id = uuid();
      const object = {
        name: item.name,
        note: item.note || '',
        badgeId,
        version: 1.0,
        created: Date.now(),
        updates: [`${id}_v1.0`]
      };

      awardKeys.push(id);
      awardObjects.push(JSON.stringify(object));
      awardArchiveKeys.push(object.updates[0]);
      awardArchiveObjects.push(JSON.stringify(object));
    }

    const awardsSpace = await box.openSpace(`${address}_awards`);
    console.log('awardKeys', awardKeys, awardObjects);
    await awardsSpace.public.setMultiple(awardKeys, awardObjects);
    console.log(awardArchiveKeys, awardArchiveObjects);
    await awardsSpace.public.setMultiple(awardArchiveKeys, awardArchiveObjects);

    const badgesSpace = await box.openSpace(`${address}_badges`);
    const badge = await badgesSpace.public.get(badgeId);
    const badgeObject = JSON.parse(badge);
    console.log('badge', badgeObject);
    console.log('awardKeys', awardKeys);
    await badgesSpace.public.set(
      badgeId,
      JSON.stringify({
        ...badgeObject,
        awards: badgeObject.awards
          ? [...badgeObject.awards, ...awardKeys]
          : awardKeys
      })
    );
  }

  public async editAward(address: string, id: string, latest: IAward) {
    latest.version = latest.version + 0.1;
    latest.updates.unshift(`${id}_v${latest.version}`);
    latest.updated = Date.now();
    const box = await this.openBox(address);

    const awardsSpace = await box.openSpace(`${address}_awards`);

    // Update public space data
    await awardsSpace.public.set(id, JSON.stringify(latest));
    await awardsSpace.public.set(latest.updates[0], JSON.stringify(latest));
  }
}
