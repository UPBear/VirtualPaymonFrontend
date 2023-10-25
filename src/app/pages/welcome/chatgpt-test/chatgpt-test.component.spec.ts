import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatgptTestComponent } from './chatgpt-test.component';

describe('ChatgptTestComponent', () => {
  let component: ChatgptTestComponent;
  let fixture: ComponentFixture<ChatgptTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatgptTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatgptTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
