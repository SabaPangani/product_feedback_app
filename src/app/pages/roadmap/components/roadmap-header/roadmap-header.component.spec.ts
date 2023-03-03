import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapHeaderComponent } from './roadmap-header.component';

describe('RoadmapHeaderComponent', () => {
  let component: RoadmapHeaderComponent;
  let fixture: ComponentFixture<RoadmapHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
