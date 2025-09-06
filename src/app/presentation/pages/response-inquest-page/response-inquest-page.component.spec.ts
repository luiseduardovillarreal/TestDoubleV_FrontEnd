import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseInquestPageComponent } from './response-inquest-page.component';

describe('ResponseInquestPageComponent', () => {
  let component: ResponseInquestPageComponent;
  let fixture: ComponentFixture<ResponseInquestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseInquestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseInquestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
