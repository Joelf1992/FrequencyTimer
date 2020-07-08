import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterFrequencyDialogComponent } from './enter-frequency-dialog.component';

describe('EnterFrequencyDialogComponent', () => {
  let component: EnterFrequencyDialogComponent;
  let fixture: ComponentFixture<EnterFrequencyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterFrequencyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterFrequencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
