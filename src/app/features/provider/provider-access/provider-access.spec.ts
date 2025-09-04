import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAccess } from './provider-access';

describe('ProviderAccess', () => {
  let component: ProviderAccess;
  let fixture: ComponentFixture<ProviderAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
