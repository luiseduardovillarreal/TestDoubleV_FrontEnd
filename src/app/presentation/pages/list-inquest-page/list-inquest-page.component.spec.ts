import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInquestPageComponent } from './list-inquest-page.component';

describe('ListInquestPageComponent', () => {
  let component: ListInquestPageComponent;
  let fixture: ComponentFixture<ListInquestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListInquestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListInquestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
