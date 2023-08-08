import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaymentDetailsComponent } from './student-payment-details.component';

describe('StudentPaymentDetailsComponent', () => {
  let component: StudentPaymentDetailsComponent;
  let fixture: ComponentFixture<StudentPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
