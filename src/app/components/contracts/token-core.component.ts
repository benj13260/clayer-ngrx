import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeployTokenCore } from '../../actions/deploy-contract.actions'
import { select, Store } from '@ngrx/store';
import { TokenCreation, ContractInfo } from '../../model/clayer';
import * as fromTokenCreationSelector from '../../selectors/token-create.selectors';

import { map, mergeMap, concatMap, switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-token-core',
    templateUrl: './app-contract.component.html',
    styleUrls: ['./app-contract.component.css']
  })
export class TokenCoreComponent {

  title = "Token core";
  tokenName = "My token core";
  contract$: Observable<ContractInfo>; 
  
  delegatecontract$: Observable<ContractInfo>; 
  addr$: Observable<string>;
  addr : string;

  constructor(private store: Store <TokenCreation>){
    this.addr$ = store.pipe(select(fromTokenCreationSelector.selectTokenDelegateAddr));
    this.contract$ = store.pipe(select(fromTokenCreationSelector.selectTokenCore));
  }

  createToken(){
   this.addr$.forEach(x =>this.addr = x);
   console.log("createTokenDelegate "+this.addr);
   this.store.dispatch(DeployTokenCore({name : this.tokenName, addr: this.addr}));
  }
}