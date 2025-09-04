import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from '../../../../environments/environment';
// import PatientRegistryABI from '../../../assets/abi/PatientRegistry.json';
// import ProviderRegistryABI from '../../../assets/abi/ProviderRegistry.json';
// import RecordsABI from '../../../assets/abi/Records.json';
// import AuditTrailABI from '../../../assets/abi/AuditTrail.json';
// import BillingABI from '../../../assets/abi/Billing.json';
// import ReferralSystemABI from '../../../assets/abi/ReferralSystem.json';

@Injectable({
  providedIn: 'root'
})
export class Blockchain {
  // private provider: ethers.BrowserProvider;
  // private patientRegistry: ethers.Contract;
  // private providerRegistry: ethers.Contract;
  // private records: ethers.Contract;
  // private auditTrail: ethers.Contract;
  // private billing: ethers.Contract;
  // private referralSystem: ethers.Contract;

  constructor() {
    // this.provider = new ethers.BrowserProvider(window.ethereum);
    // this.patientRegistry = new ethers.Contract(environment.contractAddresses.patientRegistry, PatientRegistryABI.abi, this.provider);
    // this.providerRegistry = new ethers.Contract(environment.contractAddresses.providerRegistry, ProviderRegistryABI.abi, this.provider);
    // this.records = new ethers.Contract(environment.contractAddresses.records, RecordsABI.abi, this.provider);
    // this.auditTrail = new ethers.Contract(environment.contractAddresses.auditTrail, AuditTrailABI.abi, this.provider);
    // this.billing = new ethers.Contract(environment.contractAddresses.billing, BillingABI.abi, this.provider);
    // this.referralSystem = new ethers.Contract(environment.contractAddresses.referralSystem, ReferralSystemABI.abi, this.provider);
  }

  // async getContract(contractName: 'patientRegistry' | 'providerRegistry' | 'records' | 'auditTrail' | 'billing' | 'referralSystem', signer?: ethers.Signer): Promise<ethers.Contract> {
  //   const contract = {
  //     patientRegistry: this.patientRegistry,
  //     providerRegistry: this.providerRegistry,
  //     records: this.records,
  //     auditTrail: this.auditTrail,
  //     billing: this.billing,
  //     referralSystem: this.referralSystem
  //   }[contractName];
  //   return signer ? contract.connect(signer) : contract;
  // }
}