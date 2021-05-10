import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantoverviewComponent } from './plantoverview.component';

describe('PlantoverviewComponent', () => {
  let component: PlantoverviewComponent;
  let fixture: ComponentFixture<PlantoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
