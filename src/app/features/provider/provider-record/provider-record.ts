import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Records as RecordService } from '../../../core/services/record/record';
import { Record } from '../../../shared/models/record/record.model';

@Component({
  selector: 'app-provider-record',
  standalone: false,
  templateUrl: './provider-record.html',
  styleUrl: './provider-record.scss'
})
export class ProviderRecord {
  recordForm: FormGroup;
  records: Record[] = [];
  isSubmitting = false;
  patientAddress: string = '';
  encryptionKey: string = ''; // TODO: Obtain from patient

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private recordService: RecordService,
  ) {
    this.recordForm = this.fb.group({
      patientAddress: ['', [Validators.required, Validators.pattern(/^0x[a-fA-F0-9]{40}$/)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      data: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  async loadRecords(): Promise<void> {
    if (this.recordForm.get('patientAddress')?.invalid) {
      alert('Please enter a valid patient address.');
      return;
    }

    this.patientAddress = this.recordForm.get('patientAddress')?.value;
    this.authService.getUserAddress().subscribe(providerAddress => {
      if (!providerAddress) {
        alert('Please connect your wallet.');
        return;
      }
      this.recordService.getRecords(this.patientAddress, this.encryptionKey).subscribe({
        next: (records) => this.records = records.filter(r => r.providerAddress === providerAddress),
        error: (err) => alert('Failed to load records: ' + err.message)
      });
    });
  }

  async onSubmit(): Promise<void> {
    if (this.recordForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    try {
      const signer = this.authService.getSigner();
      if (!signer) throw new Error('No wallet connected.');
      const providerAddress = await signer.getAddress();
      const { patientAddress, title, data } = this.recordForm.value;
      await this.recordService.addRecord({ title, data }, patientAddress, providerAddress, this.encryptionKey, signer).toPromise();
      alert('Record added successfully!');
      this.recordForm.reset();
      this.loadRecords();
    } catch (error: any) {
      alert(error.message || 'Failed to add record.');
    } finally {
      this.isSubmitting = false;
    }
  }
}