import { InjectionToken } from '@angular/core';
import Web3 from 'web3';

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => {
    // Check if Web3 has been injected by the browser (Mist/MetaMask).
    if (typeof Web3 !== 'undefined' && Web3.givenProvider) {
      // Use Mist/MetaMask's provider.
      console.log('{Web3.givenProvider}', Web3.givenProvider);
      return new Web3(Web3.givenProvider);
    } else {
      // Handle the case where the user doesn't have web3. Probably
      // show them a message telling them to install Metamask in
      // order to use the app.
      console.log('install metamask');
    }
  }
});
