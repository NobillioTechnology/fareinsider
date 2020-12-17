import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalFlightComponent } from './international-flight.component';

describe('InternationalFlightComponent', () => {
  let component: InternationalFlightComponent;
  let fixture: ComponentFixture<InternationalFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
