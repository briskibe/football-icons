import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionListComponent } from './competition-list.component';

describe('CompetitionListComponent', () => {
  let component: CompetitionListComponent;
  let fixture: ComponentFixture<CompetitionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompetitionListComponent]
    });
    fixture = TestBed.createComponent(CompetitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
