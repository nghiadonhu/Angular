import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlcthdnComponent } from './qlcthdn.component';

describe('QlcthdnComponent', () => {
  let component: QlcthdnComponent;
  let fixture: ComponentFixture<QlcthdnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QlcthdnComponent]
    });
    fixture = TestBed.createComponent(QlcthdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
