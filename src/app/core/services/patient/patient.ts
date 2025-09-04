import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Observable, from } from 'rxjs';
import { Blockchain } from '../blockchain/blockchain';
// import { Patient } from '../../shared/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class Patient {
  constructor(private blockchainService: Blockchain) {}

  // registerPatient(name: string, bio: string, signer: ethers.Signer): Observable<string> {
  //   return from(this.registerPatientOnChain(name, bio, signer));
  // }

  // getPatient(address: string): Observable<Patient> {
  //   return from(this.fetchPatient(address));
  // }

  // grantAccess(providerAddress: string, signer: ethers.Signer): Observable<string> {
  //   return from(this.grantAccessOnChain(providerAddress, signer));
  // }

  // revokeAccess(providerAddress: string, signer: ethers.Signer): Observable<string> {
  //   return from(this.revokeAccessOnChain(providerAddress, signer));
  // }

  // private async registerPatientOnChain(name: string, bio: string, signer: ethers.Signer): Promise<string> {
  //   const contract = await this.blockchainService.getContract('patientRegistry', signer);
  //   const tx = await contract.registerPatient(name, bio);
  //   const receipt = await tx.wait();
  //   return receipt.transactionHash;
  // }

  // private async fetchPatient(address: string): Promise<Patient> {
  //   const contract = await this.blockchainService.getContract('patientRegistry');
  //   const data = await contract.getPatient(address); // Assume contract method
  //   return {
  //     address,
  //     name: data.name,
  //     bio: data.bio,
  //     createdAt: new Date(data.createdAt * 1000).toISOString()
  //   };
  // }

  // private async grantAccessOnChain(providerAddress: string, signer: ethers.Signer): Promise<string> {
  //   const contract = await this.blockchainService.getContract('patientRegistry', signer);
  //   const tx = await contract.grantAccess(providerAddress);
  //   const receipt = await tx.wait();
  //   return receipt.transactionHash;
  // }

  // private async revokeAccessOnChain(providerAddress: string, signer: ethers.Signer): Promise<string> {
  //   const contract = await this.blockchainService.getContract('patientRegistry', signer);
  //   const tx = await contract.revokeAccess(providerAddress);
  //   const receipt = await tx.wait();
  //   return receipt.transactionHash;
  // }
}