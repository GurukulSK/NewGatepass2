import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcpnInputComponent } from './icpn-input.component';

describe('IcpnInputComponent', () => {
  let component: IcpnInputComponent;
  let fixture: ComponentFixture<IcpnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcpnInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IcpnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
