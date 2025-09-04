import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBilling } from './patient-billing';

describe('PatientBilling', () => {
  let component: PatientBilling;
  let fixture: ComponentFixture<PatientBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientBilling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
