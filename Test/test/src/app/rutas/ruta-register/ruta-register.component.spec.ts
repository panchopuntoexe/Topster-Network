import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaRegisterComponent } from './ruta-register.component';

describe('RutaRegisterComponent', () => {
  let component: RutaRegisterComponent;
  let fixture: ComponentFixture<RutaRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
