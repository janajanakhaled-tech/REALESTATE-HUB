import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPropert } from './edit-propert';

describe('EditPropert', () => {
  let component: EditPropert;
  let fixture: ComponentFixture<EditPropert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPropert],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPropert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
