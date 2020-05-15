import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule} from './material-module';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// My components
import { AppComponent } from './app.component';
import { TokenDelegateComponent } from './components/contracts/token-delegate.component';
import { TokenCoreComponent } from './components/contracts/token-core.component';
import { TokenProxyComponent } from './components/contracts/token-proxy.component';
import { DefineTokenComponent } from './components/token/define-token.component';

// My NgRx 
import { TokenCreationEffects } from './effects/token-creation.effects';
import * as TokenCreationReducer from './reducers/token-creation.reducer';


import { FormsModule } from '@angular/forms';

@NgModule({
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
    HttpClientModule,
    FormsModule,
    EffectsModule.forRoot([TokenCreationEffects]),

    //EffectsModule.forFeature([ErrorEffects]),
    StoreModule.forRoot({}),
    StoreModule.forFeature(TokenCreationReducer.FeatureKey,TokenCreationReducer.reducer),
    //StoreModule.forFeature(fromWeb3Provider.web3ProviderFeatureKey, fromWeb3Provider.reducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
