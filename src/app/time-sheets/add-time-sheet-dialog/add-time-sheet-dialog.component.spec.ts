import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeSheetDialogComponent } from './add-time-sheet-dialog.component';

describe('AddTimeSheetDialogComponent', () => {
  let component: AddTimeSheetDialogComponent;
  let fixture: ComponentFixture<AddTimeSheetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTimeSheetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimeSheetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
