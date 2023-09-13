import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubSearchComponent } from './club-search.component';

describe('ClubSearchComponent', () => {
  let component: ClubSearchComponent;
  let fixture: ComponentFixture<ClubSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClubSearchComponent]
    });
    fixture = TestBed.createComponent(ClubSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
