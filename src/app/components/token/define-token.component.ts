import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { DeployTokenDelegate } from '../../actions/deploy-contract.actions';

import { ContractInfo } from '../../model/clayer';
import * as selector from '../../selectors/token-create.selectors';

import { map, mergeMap, concatMap, switchMap } from 'rxjs/operators';


@Component({
  selector: 'token-define',
  template: `
  <input matInput placeholder="My token name" value="{{tokenName}}" (keyup)="onKey($event)">
  `
  ,
  styles: [
    ` 
    `
  ]
})
export class DefineTokenComponent {

  tokenName = "";
  title = "Token Delegate";
  contract$:  Observable<ContractInfo>;

  constructor(private store: Store <ContractInfo>){
    this.contract$ = store.pipe(select(selector.selectTokenDelegate));
  }

  onKey(event: any) { 
    this.tokenName = event.target.value ;
  }

}
