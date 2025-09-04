import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRecord } from './provider-record';

describe('ProviderRecord', () => {
  let component: ProviderRecord;
  let fixture: ComponentFixture<ProviderRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProviderRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderRecord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
