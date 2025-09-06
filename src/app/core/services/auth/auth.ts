import { Injectable } from '@angular/core';
import { ethers, EnsResolver, BaseContract, BrowserProvider, Signer } from 'ethers';
import { BehaviorSubject, Observable } from 'rxjs';
import detectEthereumProvider from '@metamask/detect-provider';
import SubdomainRegistrarABI from '../../../../assets/abi/SubdomainRegistrar.json';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Auth {
  private userAddress = new BehaviorSubject<string | null>(null);
  provider?: ethers.BrowserProvider;
  private signer: ethers.Signer | null = null;
  private ensResolver: EnsResolver | null = null;
  private subdomainRegistrar: BaseContract | null = null;

  constructor() {
    this.initializeProvider();
  }

  private async initializeProvider(): Promise<void> {
    const provider: any = await detectEthereumProvider();
    if (!provider) {
      throw new Error('No Ethereum provider found. Please install MetaMask.');
    }
    this.provider = new ethers.BrowserProvider(provider);
    this.subdomainRegistrar = new ethers.Contract(environment.contractAddresses.patientRegistry, SubdomainRegistrarABI, this.provider);
  }

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
    this.signer = null;
    localStorage.removeItem('userAddress');
  }

  async resolveEnsName(ensName: string): Promise<string | null> {
    if (!this.provider) {
        throw new Error('No provider available. Please connect your wallet first.');
    }
    const resolvedAddress = await this.provider.resolveName(ensName);
    return resolvedAddress;
  }

  async lookupEnsName(address: string): Promise<string | null> {
    if (!this.provider) {
      throw new Error('No provider available. Please connect your wallet first.');
    }
    const ensName = await this.provider.lookupAddress(address);
    return ensName;
  }

  /**
   * Registers a new ENS subdomain for a given user address.
   * @param ensName The full ENS name to register (e.g., "my-clinic.clinic-data.eth").
   * @param userAddress The Ethereum address to associate with the registered ENS name.
   * @returns A promise that resolves when the ENS name registration is complete.
   */
  async registerEns(ensName: string, userAddress: string): Promise<void> {
    if (!this.signer) {
        throw new Error('No signer available. Please connect your wallet.');
    }

    // Extract the label part of the ENS name (e.g., "my-clinic" from "my-clinic.clinic-data.eth")
    const label = ensName.split('.')[0];

    // Instantiate the SubdomainRegistrar contract
    const ensRegistrarContract = new ethers.Contract(
      environment.contractAddresses.sudomainRegistrar,
      SubdomainRegistrarABI,
      this.signer
    );

    // Call the registerSubdomain function on the contract
    // [cite_start]// This function is defined in the SubdomainRegistrar.sol contract [cite: 2]
    const tx = await ensRegistrarContract['registerSubdomain'](label, userAddress);

    // Wait for the transaction to be mined and confirmed on the blockchain
    await tx.wait();

    console.log(`Successfully registered ENS name: ${ensName} for address: ${userAddress}`);
  }
}