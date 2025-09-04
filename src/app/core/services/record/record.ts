import { Injectable } from '@angular/core';
import { ethers, BaseContract, Signer } from 'ethers';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Blockchain } from '../blockchain/blockchain';
import { Ipfs } from '../ipfs/ipfs';
import { Encryption } from '../encryption/encryption';
import { Record as RecordModel } from '../../../shared/models/record/record.model';

// 1. Define the custom interface for the Records contract
interface RecordsContract extends BaseContract {
  addRecord(patientAddress: string, ipfsHash: string, providerAddress: string): Promise<ethers.ContractTransactionResponse>;
  getRecords(patientAddress: string): Promise<any[]>;
}

@Injectable({
  providedIn: 'root'
})
export class Records {
  constructor(
    private blockchainService: Blockchain,
    private ipfsService: Ipfs,
    private encryptionService: Encryption
  ) {}

  addRecord(record: any, patientAddress: string, providerAddress: string, encryptionKey: string, signer: Signer): Observable<string> {
    return from(this.ipfsService.upload(this.encryptionService.encrypt(record, encryptionKey))).pipe(
      switchMap(ipfsHash => this.addRecordOnChain(ipfsHash, patientAddress, providerAddress, signer))
    );
  }

  getRecords(patientAddress: string, encryptionKey: string): Observable<RecordModel[]> {
    return from(this.fetchRecords(patientAddress, encryptionKey));
  }

  private async addRecordOnChain(ipfsHash: string, patientAddress: string, providerAddress: string, signer: Signer): Promise<string> {
    // 2. Cast the contract object to the custom interface
    const contract = await this.blockchainService.getContract('records', signer) as RecordsContract;
    const tx = await contract.addRecord(patientAddress, ipfsHash, providerAddress);
    const receipt = await tx.wait();
    // 3. Fix transactionHash to hash
    return receipt!.hash;
  }

  private async fetchRecords(patientAddress: string, encryptionKey: string): Promise<RecordModel[]> {
    // 2. Cast the contract object to the custom interface
    const contract = await this.blockchainService.getContract('records') as RecordsContract;
    const records = await contract.getRecords(patientAddress);
    const results: RecordModel[] = [];
    for (const rec of records) {
      const data = await this.ipfsService.download(rec.ipfsHash);
      const decrypted = this.encryptionService.decrypt(data, encryptionKey);
      results.push({
        id: rec.id,
        patientAddress: rec.patientAddress,
        providerAddress: rec.providerAddress,
        title: decrypted.title,
        data: decrypted,
        ipfsHash: rec.ipfsHash,
        createdAt: new Date(Number(rec.createdAt) * 1000).toISOString()
      });
    }
    return results;
  }
}