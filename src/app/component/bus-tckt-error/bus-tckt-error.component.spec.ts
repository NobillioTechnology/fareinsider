import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTcktErrorComponent } from './bus-tckt-error.component';

describe('BusTcktErrorComponent', () => {
  let component: BusTcktErrorComponent;
  let fixture: ComponentFixture<BusTcktErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusTcktErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTcktErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
