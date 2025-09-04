import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRegister } from './provider-register';

describe('ProviderRegister', () => {
  let component: ProviderRegister;
  let fixture: ComponentFixture<ProviderRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
