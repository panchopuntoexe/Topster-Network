import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaSearchComponent } from './ruta-search.component';

describe('RutaSearchComponent', () => {
  let component: RutaSearchComponent;
  let fixture: ComponentFixture<RutaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
