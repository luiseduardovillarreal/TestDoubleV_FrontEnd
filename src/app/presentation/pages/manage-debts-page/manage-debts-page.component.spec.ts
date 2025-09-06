import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDebtsPageComponent } from './manage-debts-page.component';

describe('ManageDebtsPageComponent', () => {
  let component: ManageDebtsPageComponent;
  let fixture: ComponentFixture<ManageDebtsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDebtsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageDebtsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});