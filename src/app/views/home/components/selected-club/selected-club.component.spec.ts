import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedClubComponent } from './selected-club.component';

describe('SelectedClubComponent', () => {
  let component: SelectedClubComponent;
  let fixture: ComponentFixture<SelectedClubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectedClubComponent]
    });
    fixture = TestBed.createComponent(SelectedClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
