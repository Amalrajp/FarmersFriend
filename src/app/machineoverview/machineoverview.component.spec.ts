import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineoverviewComponent } from './machineoverview.component';

describe('MachineoverviewComponent', () => {
  let component: MachineoverviewComponent;
  let fixture: ComponentFixture<MachineoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
