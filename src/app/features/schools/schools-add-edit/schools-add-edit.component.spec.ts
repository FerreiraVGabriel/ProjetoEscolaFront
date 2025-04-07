import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsAddEditComponent } from './schools-add-edit.component';

describe('SchoolsAddEditComponent', () => {
  let component: SchoolsAddEditComponent;
  let fixture: ComponentFixture<SchoolsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchoolsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
