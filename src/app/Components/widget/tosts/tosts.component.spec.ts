import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TostsComponent } from './tosts.component';

describe('TostsComponent', () => {
  let component: TostsComponent;
  let fixture: ComponentFixture<TostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
