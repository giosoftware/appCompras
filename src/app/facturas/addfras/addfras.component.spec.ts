import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfrasComponent } from './addfras.component';

describe('AddfrasComponent', () => {
  let component: AddfrasComponent;
  let fixture: ComponentFixture<AddfrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
