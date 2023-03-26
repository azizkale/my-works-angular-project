import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HatimComponent } from './hatim.component';

describe('HatimComponent', () => {
  let component: HatimComponent;
  let fixture: ComponentFixture<HatimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HatimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HatimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
