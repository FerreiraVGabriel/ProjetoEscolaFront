import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAddEditComponent } from './students-add-edit.component';

describe('StudentsAddEditComponent', () => {
  let component: StudentsAddEditComponent;
  let fixture: ComponentFixture<StudentsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
