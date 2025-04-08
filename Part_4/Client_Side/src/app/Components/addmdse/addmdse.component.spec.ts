import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmdseComponent } from './addmdse.component';

describe('AddmdseComponent', () => {
  let component: AddmdseComponent;
  let fixture: ComponentFixture<AddmdseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmdseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmdseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
