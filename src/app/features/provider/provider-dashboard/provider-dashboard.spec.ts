import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashboard } from './provider-dashboard';

describe('ProviderDashboard', () => {
  let component: ProviderDashboard;
  let fixture: ComponentFixture<ProviderDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
