import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStatusComponent } from './character-status.component';

describe('CharacterStatusComponent', () => {
  let component: CharacterStatusComponent;
  let fixture: ComponentFixture<CharacterStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
