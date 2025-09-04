import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Observable, from } from 'rxjs';
import { Blockchain } from '../blockchain/blockchain';
// import { Provider } from '../../shared/models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class Provider {
  constructor(private blockchainService: Blockchain) {}

  // registerProvider(name: string, specialty: string, signer: ethers.Signer): Observable<string> {
  //   return from(this.registerProviderOnChain(name, specialty, signer));
  // }

  // getProvider(address: string): Observable<Provider> {
  //   return from(this.fetchProvider(address));
  // }

  // createReferral(patientAddress: string, toProvider: string, signer: ethers.Signer): Observable<string> {
  //   return from(this.createReferralOnChain(patientAddress, toProvider, signer));
  // }

  // private async registerProviderOnChain(name: string, specialty: string, signer: ethers.Signer): Promise<string> {
  //   const contract = await this.blockchainService.getContract('providerRegistry', signer);
  //   const tx = await contract.registerProvider(name, specialty);
  //   const receipt = await tx.wait();
  //   return receipt.transactionHash;
  // }

  // private async fetchProvider(address: string): Promise<Provider> {
  //   const contract = await this.blockchainService.getContract('providerRegistry');
  //   const data = await contract.getProvider(address); // Assume contract method
  //   return {
  //     address,
  //     name: data.name,
  //     specialty: data.specialty,
  //     createdAt: new Date(data.createdAt * 1000).toISOString()
  //   };
  // }

  // private async createReferralOnChain(patientAddress: string, toProvider: string, signer: ethers.Signer): Promise<string> {
  //   const contract = await this.blockchainService.getContract('referralSystem', signer);
  //   const tx = await contract.createReferral(patientAddress, toProvider);
  //   const receipt = await tx.wait();
  //   return receipt.transactionHash;
  // }
}