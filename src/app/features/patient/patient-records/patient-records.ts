import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Records as RecordService } from '../../../core/services/record/record';
import { Record } from '../../../shared/models/record/record.model';

@Component({
  selector: 'app-patient-records',
  standalone: false,
  templateUrl: './patient-records.html',
  styleUrl: './patient-records.scss'
})
export class PatientRecords {
  recordForm: FormGroup;
  records: Record[] = [];
  isSubmitting = false;
  encryptionKey: string = ''; // TODO: Securely obtain from user or wallet

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private recordService: RecordService,
  ) {
    this.recordForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      data: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadRecords();
  }

  private loadRecords(): void {
    this.authService.getUserAddress().subscribe(address => {
      if (!address) {
        alert('Please connect your wallet.');
        return;
      }
      this.recordService.getRecords(address, this.encryptionKey).subscribe({
        next: (records) => this.records = records,
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
      const address = await signer.getAddress();
      const { title, data } = this.recordForm.value;
      await this.recordService.addRecord({ title, data }, address, address, this.encryptionKey, signer).toPromise();
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