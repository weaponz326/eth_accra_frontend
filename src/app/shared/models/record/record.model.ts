export interface Record {
  id: string; // Unique record ID (e.g., hash or contract-generated)
  patientAddress: string; // Owner of the record
  providerAddress: string; // Creator of the record
  title: string; // e.g., "Blood Test Results"
  data: any; // Decrypted JSON data (FHIR-like structure)
  ipfsHash: string; // CID from IPFS
  createdAt: string; // ISO timestamp
}