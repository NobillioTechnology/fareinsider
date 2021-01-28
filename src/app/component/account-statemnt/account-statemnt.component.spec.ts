import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatemntComponent } from './account-statemnt.component';

describe('AccountStatemntComponent', () => {
  let component: AccountStatemntComponent;
  let fixture: ComponentFixture<AccountStatemntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountStatemntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
