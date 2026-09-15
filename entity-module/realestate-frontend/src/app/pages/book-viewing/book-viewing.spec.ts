import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookViewing } from './book-viewing';

describe('BookViewing', () => {
  let component: BookViewing;
  let fixture: ComponentFixture<BookViewing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookViewing],
    }).compileComponents();

    fixture = TestBed.createComponent(BookViewing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
