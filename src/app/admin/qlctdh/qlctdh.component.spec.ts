import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlctdhComponent } from './qlctdh.component';

describe('QlctdhComponent', () => {
  let component: QlctdhComponent;
  let fixture: ComponentFixture<QlctdhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QlctdhComponent]
    });
    fixture = TestBed.createComponent(QlctdhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
