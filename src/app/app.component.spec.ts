import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TokenDelegateComponent } from './components/contracts/token-delegate.component';
import { TokenCoreComponent } from './components/contracts/token-core.component';
import { TokenProxyComponent } from './components/contracts/token-proxy.component';
import { DefineTokenComponent } from './components/token/define-token.component';

import { MaterialModule} from './material-module';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TokenDelegateComponent,
        TokenCoreComponent,
        TokenProxyComponent,
        DefineTokenComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        StoreModule.forRoot({}),
      ],
/*      providers: [
        { provide: Store, useValue: mockStore },
      ] */
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.status$ = new Observable((ob) => ob.next("1"));
    expect(app).toBeTruthy();
  });
/*
  it(`should have as title 'app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.status$ = new Observable((ob) => ob.next("1"));
    expect(app.title).toEqual('app');
  });

  
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content h1').textContent).toContain('C-Layer Token Creation');
  });

  */
});
