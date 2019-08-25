import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogBadgeComponent } from './log-badge.component';

describe('LogBadgeComponent', () => {
  let component: LogBadgeComponent;
  let fixture: ComponentFixture<LogBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
