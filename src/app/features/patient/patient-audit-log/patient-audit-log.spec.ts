import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAuditLog } from './patient-audit-log';

describe('PatientAuditLog', () => {
  let component: PatientAuditLog;
  let fixture: ComponentFixture<PatientAuditLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientAuditLog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAuditLog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
