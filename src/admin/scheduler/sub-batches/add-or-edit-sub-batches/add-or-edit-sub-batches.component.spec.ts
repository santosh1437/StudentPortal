import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditSubBatchesComponent } from './add-or-edit-sub-batches.component';

describe('AddOrEditSubBatchesComponent', () => {
  let component: AddOrEditSubBatchesComponent;
  let fixture: ComponentFixture<AddOrEditSubBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditSubBatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditSubBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
