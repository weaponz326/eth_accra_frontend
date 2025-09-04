import { Injectable } from '@angular/core';
import { ethers, BaseContract, Signer } from 'ethers';
import { Observable, from } from 'rxjs';
import { Blockchain } from '../blockchain/blockchain';
import { Provider as ProviderModel } from '../../../shared/models/provider/provider.model';

// 1. Define custom interfaces for both contracts
interface ProviderRegistryContract extends BaseContract {
  registerProvider(name: string, specialty: string): Promise<ethers.ContractTransactionResponse>;
  getProvider(address: string): Promise<{ name: string; specialty: string; createdAt: number }>;
}

interface ReferralSystemContract extends BaseContract {
  createReferral(patientAddress: string, toProvider: string): Promise<ethers.ContractTransactionResponse>;
  // Add other methods from your ReferralSystem contract
}

@Injectable({
  providedIn: 'root'
})
export class Provider {
  constructor(private blockchainService: Blockchain) {}

  registerProvider(name: string, specialty: string, signer: Signer): Observable<string> {
    return from(this.registerProviderOnChain(name, specialty, signer));
  }

  getProvider(address: string): Observable<ProviderModel> {
    return from(this.fetchProvider(address));
  }

  createReferral(patientAddress: string, toProvider: string, signer: Signer): Observable<string> {
    return from(this.createReferralOnChain(patientAddress, toProvider, signer));
  }

  private async registerProviderOnChain(name: string, specialty: string, signer: Signer): Promise<string> {
    // 2. Cast to ProviderRegistryContract
    const contract = await this.blockchainService.getContract('providerRegistry', signer) as ProviderRegistryContract;
    const tx = await contract.registerProvider(name, specialty);
    const receipt = await tx.wait();
    // 3. Fix transactionHash to hash
    return receipt!.hash;
  }

  private async fetchProvider(address: string): Promise<ProviderModel> {
    // 2. Cast to ProviderRegistryContract
    const contract = await this.blockchainService.getContract('providerRegistry') as ProviderRegistryContract;
    const data = await contract.getProvider(address);
    return {
      address,
      name: data.name,
      specialty: data.specialty,
      createdAt: new Date(Number(data.createdAt) * 1000).toISOString()
    };
  }

  private async createReferralOnChain(patientAddress: string, toProvider: string, signer: Signer): Promise<string> {
    // 2. Cast to ReferralSystemContract
    const contract = await this.blockchainService.getContract('referralSystem', signer) as ReferralSystemContract;
    const tx = await contract.createReferral(patientAddress, toProvider);
    const receipt = await tx.wait();
    // 3. Fix transactionHash to hash
    return receipt!.hash;
  }
}