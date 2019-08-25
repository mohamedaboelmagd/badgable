import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAwardComponent } from './log-award.component';

describe('LogAwardComponent', () => {
  let component: LogAwardComponent;
  let fixture: ComponentFixture<LogAwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogAwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
