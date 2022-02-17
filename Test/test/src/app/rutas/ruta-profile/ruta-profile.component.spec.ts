import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaProfileComponent } from './ruta-profile.component';

describe('RutaProfileComponent', () => {
  let component: RutaProfileComponent;
  let fixture: ComponentFixture<RutaProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
