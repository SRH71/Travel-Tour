import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTourEdit } from './admin-tour-edit';

describe('AdminTourEdit', () => {
  let component: AdminTourEdit;
  let fixture: ComponentFixture<AdminTourEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTourEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTourEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
