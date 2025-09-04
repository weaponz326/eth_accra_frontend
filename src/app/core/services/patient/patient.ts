import { Injectable } from '@angular/core';
import { ethers, BaseContract, Signer } from 'ethers';
import { Observable, from } from 'rxjs';
import { Blockchain } from '../blockchain/blockchain';
import { Patient as PatientModel } from '../../../shared/models/patient/patient.model';

// 1. Define the custom interface for the PatientRegistry contract
interface PatientRegistryContract extends BaseContract {
  registerPatient(name: string, bio: string): Promise<ethers.ContractTransactionResponse>;
  getPatient(address: string): Promise<{ name: string; bio: string; createdAt: number }>;
  grantAccess(providerAddress: string): Promise<ethers.ContractTransactionResponse>;
  revokeAccess(providerAddress: string): Promise<ethers.ContractTransactionResponse>;
}

@Injectable({
  providedIn: 'root'
})
export class Patient {
  constructor(private blockchainService: Blockchain) {}

  registerPatient(name: string, bio: string, signer: Signer): Observable<string> {
    return from(this.registerPatientOnChain(name, bio, signer));
  }

  getPatient(address: string): Observable<PatientModel> {
    return from(this.fetchPatient(address));
  }

  grantAccess(providerAddress: string, signer: Signer): Observable<string> {
    return from(this.grantAccessOnChain(providerAddress, signer));
  }

  revokeAccess(providerAddress: string, signer: Signer): Observable<string> {
    return from(this.revokeAccessOnChain(providerAddress, signer));
  }

  private async registerPatientOnChain(name: string, bio: string, signer: Signer): Promise<string> {
    // 2. Cast the contract object to the custom interface
    const contract = await this.blockchainService.getContract('patientRegistry', signer) as PatientRegistryContract;
    const tx = await contract.registerPatient(name, bio);
    const receipt = await tx.wait();
    return receipt!.hash;
  }

  private async fetchPatient(address: string): Promise<PatientModel> {
    const contract = await this.blockchainService.getContract('patientRegistry') as PatientRegistryContract;
    const data = await contract.getPatient(address);
    return {
      address,
      name: data.name,
      bio: data.bio,
      createdAt: new Date(Number(data.createdAt) * 1000).toISOString()
    };
  }

  private async grantAccessOnChain(providerAddress: string, signer: Signer): Promise<string> {
    const contract = await this.blockchainService.getContract('patientRegistry', signer) as PatientRegistryContract;
    const tx = await contract.grantAccess(providerAddress);
    const receipt = await tx.wait();
    return receipt!.hash;
  }

  private async revokeAccessOnChain(providerAddress: string, signer: Signer): Promise<string> {
    const contract = await this.blockchainService.getContract('patientRegistry', signer) as PatientRegistryContract;
    const tx = await contract.revokeAccess(providerAddress);
    const receipt = await tx.wait();
    return receipt!.hash;
  }
}