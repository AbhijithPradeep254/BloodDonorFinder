import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedreqsComponent } from './postedreqs.component';

describe('PostedreqsComponent', () => {
  let component: PostedreqsComponent;
  let fixture: ComponentFixture<PostedreqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostedreqsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedreqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
