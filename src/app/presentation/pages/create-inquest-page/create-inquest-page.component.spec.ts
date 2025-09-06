import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInquestPageComponent } from './create-inquest-page.component';

describe('CreateInquestPageComponent', () => {
  let component: CreateInquestPageComponent;
  let fixture: ComponentFixture<CreateInquestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInquestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInquestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
