import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTopBarComponent } from './nav-top-bar.component';

describe('NavTopBarComponent', () => {
  let component: NavTopBarComponent;
  let fixture: ComponentFixture<NavTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavTopBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
