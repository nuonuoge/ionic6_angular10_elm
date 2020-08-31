import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GangMainComponent } from './gang-main.component';

describe('GangMainComponent', () => {
  let component: GangMainComponent;
  let fixture: ComponentFixture<GangMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GangMainComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GangMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
