import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDebtsPageComponent } from './list-debts-page.component';

describe('ListDebtsPageComponent', () => {
  let component: ListDebtsPageComponent;
  let fixture: ComponentFixture<ListDebtsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDebtsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDebtsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
