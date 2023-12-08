import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomMeeting1Component } from './zoom-meeting1.component';

describe('ZoomMeeting1Component', () => {
  let component: ZoomMeeting1Component;
  let fixture: ComponentFixture<ZoomMeeting1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomMeeting1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoomMeeting1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
