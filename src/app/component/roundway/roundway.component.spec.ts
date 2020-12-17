import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundwayComponent } from './roundway.component';

describe('RoundwayComponent', () => {
  let component: RoundwayComponent;
  let fixture: ComponentFixture<RoundwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundwayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
