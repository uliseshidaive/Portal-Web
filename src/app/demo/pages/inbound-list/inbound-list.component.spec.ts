import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundListComponent } from './inbound-list.component';

describe('InboundListComponent', () => {
  let component: InboundListComponent;
  let fixture: ComponentFixture<InboundListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboundListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
