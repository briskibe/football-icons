import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubSearchListComponent } from './club-search-list.component';

describe('ClubSearchListComponent', () => {
  let component: ClubSearchListComponent;
  let fixture: ComponentFixture<ClubSearchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClubSearchListComponent]
    });
    fixture = TestBed.createComponent(ClubSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
