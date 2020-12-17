import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelResultComponent } from './hotel-result.component';

describe('HotelResultComponent', () => {
  let component: HotelResultComponent;
  let fixture: ComponentFixture<HotelResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
