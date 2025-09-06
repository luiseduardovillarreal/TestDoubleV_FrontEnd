import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapResultResponsesComponent } from './map-result-responses.component';

describe('MapResultResponsesComponent', () => {
  let component: MapResultResponsesComponent;
  let fixture: ComponentFixture<MapResultResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapResultResponsesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapResultResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
