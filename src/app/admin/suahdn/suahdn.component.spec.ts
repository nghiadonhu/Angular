import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuahdnComponent } from './suahdn.component';

describe('SuahdnComponent', () => {
  let component: SuahdnComponent;
  let fixture: ComponentFixture<SuahdnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuahdnComponent]
    });
    fixture = TestBed.createComponent(SuahdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
