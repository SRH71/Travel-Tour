import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTourCreate } from './admin-tour-create';

describe('AdminTourCreate', () => {
  let component: AdminTourCreate;
  let fixture: ComponentFixture<AdminTourCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTourCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTourCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
