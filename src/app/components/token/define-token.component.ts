import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { TokenDefinition, ContractInfo, TokenCreation } from '../../model/clayer';
import * as selector from '../../selectors/token-create.selectors';
import * as fromTokenCreationSelector from '../../selectors/token-create.selectors';
import { UpdateToken } from '../../actions/deploy-contract.actions'


@Component({
  selector: 'token-define',
  template: `
  <mat-card>
    <mat-card-header>
        <mat-card-title>
            {{ (title) }}
        </mat-card-title>
    </mat-card-header>
    <mat-card-content>
        <form class="token-form" >
        <mat-form-field class="token-full-width">
          <mat-label>Token name</mat-label>
          <input id="name" matInput placeholder="" value="{{tokenName}}" [(ngModel)]="tokenName" name="tokenName">
        </mat-form-field>

        <mat-form-field class="token-full-width">
        <mat-label>Token Symbol</mat-label>
        <input id="sym" matInput placeholder="" value="{{tokenSym}}"  [(ngModel)]="tokenSym" name="tokenSym">
        </mat-form-field>
      </form>
      <button mat-button (click)="updateToken()">
        <span class="material-icons">
            autorenew
        </span>
      </button>
    </mat-card-content>
  </mat-card>
  `
  ,
  styles: [
    ` 
    .token-form {
      /*min-width: 150px;
      max-width: 500px;*/
      width: 100%;
    }
    
    .token-full-width {
      width: 100%;
    }
    `
  ]
})
export class DefineTokenComponent {

  
  tokenName = "";
  tokenSym = "";

  title = "Define Token";

   // Core token address used for deployment
   coreContract$: Observable<ContractInfo>;
   proxyContract$: Observable<ContractInfo>;

  constructor(private store: Store <TokenCreation>) {     
    this.coreContract$ = store.pipe(select(fromTokenCreationSelector.selectTokenCore));
    this.proxyContract$ = store.pipe(select(fromTokenCreationSelector.selectTokenCore));
  }

  updateToken(){
    let coreAddr, proxyAddr: string;
    this.coreContract$.forEach(x => coreAddr = x.address);
    this.proxyContract$.forEach(x => proxyAddr = x.address);
    let def : TokenDefinition = new TokenDefinition();
    def.coreAddr = coreAddr;
    def.proxyAddr = proxyAddr;
    def.id = 0;
    def.name = this.tokenName;
    def.sym = this.tokenSym;
    def.dec = 18;
    this.store.dispatch(UpdateToken({payload: def}));
  }

}