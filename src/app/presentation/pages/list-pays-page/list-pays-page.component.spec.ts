import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaysPageComponent } from './list-pays-page.component';

describe('ListPaysPageComponent', () => {
  let component: ListPaysPageComponent;
  let fixture: ComponentFixture<ListPaysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPaysPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPaysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
