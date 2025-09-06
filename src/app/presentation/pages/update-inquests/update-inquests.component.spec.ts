import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInquestsComponent } from './update-inquests.component';

describe('UpdateInquestsComponent', () => {
  let component: UpdateInquestsComponent;
  let fixture: ComponentFixture<UpdateInquestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInquestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateInquestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
