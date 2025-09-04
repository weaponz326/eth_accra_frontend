import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderBilling } from './provider-billing';

describe('ProviderBilling', () => {
  let component: ProviderBilling;
  let fixture: ComponentFixture<ProviderBilling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderBilling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderBilling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
