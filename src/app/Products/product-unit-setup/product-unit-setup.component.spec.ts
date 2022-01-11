import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitSetupComponent } from './product-unit-setup.component';

describe('ProductUnitSetupComponent', () => {
  let component: ProductUnitSetupComponent;
  let fixture: ComponentFixture<ProductUnitSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUnitSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUnitSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
