import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupGatepassComponent } from './group-gatepass.component';

describe('GroupGatepassComponent', () => {
  let component: GroupGatepassComponent;
  let fixture: ComponentFixture<GroupGatepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupGatepassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupGatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
