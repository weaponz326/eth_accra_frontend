import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject, Observable } from 'rxjs';
import detectEthereumProvider from '@metamask/detect-provider';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private userAddress = new BehaviorSubject<string | null>(null);
  provider?: ethers.BrowserProvider;
  private signer: ethers.Signer | null = null;

  async connectWallet(): Promise<string> {
    const provider: any = await detectEthereumProvider();
    if (!provider) throw new Error('Install MetaMask');
    await provider.request({ method: 'eth_requestAccounts' });
    this.provider = new ethers.BrowserProvider(provider);
    this.signer = await this.provider.getSigner();
    const addr = await this.signer.getAddress();
    this.userAddress.next(addr);
    localStorage.setItem('userAddress', addr);
    return addr;
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
    this.userAddress.next(null);
    localStorage.removeItem('userAddress');
    this.provider = undefined;
    this.signer = null;
  }
}