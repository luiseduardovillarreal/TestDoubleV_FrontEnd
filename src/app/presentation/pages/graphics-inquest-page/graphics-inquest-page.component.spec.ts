import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsInquestPageComponent } from './graphics-inquest-page.component';

describe('GraphicsInquestPageComponent', () => {
  let component: GraphicsInquestPageComponent;
  let fixture: ComponentFixture<GraphicsInquestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicsInquestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphicsInquestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
