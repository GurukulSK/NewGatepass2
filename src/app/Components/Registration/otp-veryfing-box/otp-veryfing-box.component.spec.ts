import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVeryfingBoxComponent } from './otp-veryfing-box.component';

describe('OtpVeryfingBoxComponent', () => {
  let component: OtpVeryfingBoxComponent;
  let fixture: ComponentFixture<OtpVeryfingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpVeryfingBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpVeryfingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
