import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContacts } from './admin-contacts';

describe('AdminContacts', () => {
  let component: AdminContacts;
  let fixture: ComponentFixture<AdminContacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContacts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContacts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
