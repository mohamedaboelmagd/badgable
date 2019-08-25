import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBadgesComponent } from './show-badges.component';

describe('ShowBadgesComponent', () => {
  let component: ShowBadgesComponent;
  let fixture: ComponentFixture<ShowBadgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBadgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
