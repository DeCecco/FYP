import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateModifyPage } from './create-modify.page';

describe('CreateModifyPage', () => {
  let component: CreateModifyPage;
  let fixture: ComponentFixture<CreateModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateModifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
