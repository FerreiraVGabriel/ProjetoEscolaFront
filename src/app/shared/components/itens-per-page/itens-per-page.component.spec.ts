import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensPerPageComponent } from './itens-per-page.component';

describe('ItensPerPageComponent', () => {
  let component: ItensPerPageComponent;
  let fixture: ComponentFixture<ItensPerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensPerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItensPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
