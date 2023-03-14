import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SabhaComponent } from './sabha.component';

describe('SabhaComponent', () => {
  let component: SabhaComponent;
  let fixture: ComponentFixture<SabhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SabhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SabhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
