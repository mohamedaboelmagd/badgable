import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAwardsComponent } from './show-awards.component';

describe('ShowAwardsComponent', () => {
  let component: ShowAwardsComponent;
  let fixture: ComponentFixture<ShowAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
