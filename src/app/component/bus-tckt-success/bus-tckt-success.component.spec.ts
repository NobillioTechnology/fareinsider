import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTcktSuccessComponent } from './bus-tckt-success.component';

describe('BusTcktSuccessComponent', () => {
  let component: BusTcktSuccessComponent;
  let fixture: ComponentFixture<BusTcktSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusTcktSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusTcktSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
