export interface Invoice {
  id: string; // Unique invoice ID (from contract)
  patientAddress: string; // Billed patient
  providerAddress: string; // Billing provider
  amount: number; // In wei or stablecoin units
  description: string; // Service description
  status: 'Pending' | 'Paid' | 'Disputed'; // Payment status
  createdAt: string; // ISO timestamp
}