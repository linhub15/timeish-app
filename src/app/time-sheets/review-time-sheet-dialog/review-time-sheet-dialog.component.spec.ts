import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTimeSheetDialogComponent } from './review-time-sheet-dialog.component';

describe('ReviewTimeSheetDialogComponent', () => {
  let component: ReviewTimeSheetDialogComponent;
  let fixture: ComponentFixture<ReviewTimeSheetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTimeSheetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTimeSheetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
