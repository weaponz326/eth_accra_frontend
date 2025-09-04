import { Injectable } from '@angular/core';
import { ethers, BaseContract, BrowserProvider, Signer } from 'ethers';
import { environment } from '../../../../environments/environment';
import detectEthereumProvider from '@metamask/detect-provider';
import PatientRegistryABI from '../../../../assets/abi/PatientRegistry.json';
import ProviderRegistryABI from '../../../../assets/abi/ProviderRegistry.json';
import RecordsABI from '../../../../assets/abi/Records.json';
import AuditTrailABI from '../../../../assets/abi/AuditTrail.json';
import BillingABI from '../../../../assets/abi/Billing.json';
import ReferralSystemABI from '../../../../assets/abi/ReferralSystem.json';

@Injectable({
  providedIn: 'root'
})
export class Blockchain {
  private provider: BrowserProvider | null = null;
  private patientRegistry: BaseContract | null = null;
  private providerRegistry: BaseContract | null = null;
  private records: BaseContract | null = null;
  private auditTrail: BaseContract | null = null;
  private billing: BaseContract | null = null;
  private referralSystem: BaseContract | null = null;

  constructor() {
    this.initializeProvider();
  }

  private async initializeProvider(): Promise<void> {
    const provider: any = await detectEthereumProvider();
    if (!provider) {
      throw new Error('No Ethereum provider found. Please install MetaMask.');
    }
    this.provider = new ethers.BrowserProvider(provider);
    this.patientRegistry = new ethers.Contract(environment.contractAddresses.patientRegistry, PatientRegistryABI, this.provider);
    this.providerRegistry = new ethers.Contract(environment.contractAddresses.providerRegistry, ProviderRegistryABI, this.provider);
    this.records = new ethers.Contract(environment.contractAddresses.records, RecordsABI, this.provider);
    this.auditTrail = new ethers.Contract(environment.contractAddresses.auditTrail, AuditTrailABI, this.provider);
    this.billing = new ethers.Contract(environment.contractAddresses.billing, BillingABI, this.provider);
    this.referralSystem = new ethers.Contract(environment.contractAddresses.referralSystem, ReferralSystemABI, this.provider);
  }

  async getContract(contractName: 'patientRegistry' | 'providerRegistry' | 'records' | 'auditTrail' | 'billing' | 'referralSystem', signer?: Signer): Promise<BaseContract> {
    if (!this.provider) {
      await this.initializeProvider();
    }
    const contract = {
      patientRegistry: this.patientRegistry,
      providerRegistry: this.providerRegistry,
      records: this.records,
      auditTrail: this.auditTrail,
      billing: this.billing,
      referralSystem: this.referralSystem
    }[contractName];
    if (!contract) {
      throw new Error(`Contract ${contractName} not initialized`);
    }
    return signer ? contract.connect(signer) : contract;
  }
}