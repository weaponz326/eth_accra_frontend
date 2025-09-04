import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
// import { Web3Modal } from '@web3modal/ethers';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  // private web3Modal: Web3Modal;
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;
  private userAddress = new BehaviorSubject<string | null>(null);

  constructor() {
    // this.web3Modal = new Web3Modal({
    //   projectId: environment.walletConnectProjectId || 'YOUR_WALLET_CONNECT_PROJECT_ID',
    //   walletConnectVersion: 2
    // });
  }

  async connectWallet(): Promise<void> {
    try {
      // const instance = await this.web3Modal.connect();
      // this.provider = new ethers.BrowserProvider(instance);
      // this.signer = await this.provider.getSigner();
      // const address = await this.signer.getAddress();
      // this.userAddress.next(address);
      // localStorage.setItem('userAddress', address);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      throw error;
    }
  }

  getUserAddress(): Observable<string | null> {
    return this.userAddress.asObservable();
  }

  async signMessage(message: string): Promise<string> {
    if (!this.signer) throw new Error('No signer available');
    return await this.signer.signMessage(message);
  }

  getSigner(): ethers.Signer | null {
    return this.signer;
  }

  disconnect(): void {
    // this.web3Modal.disconnect();
    this.userAddress.next(null);
    localStorage.removeItem('userAddress');
  }
}