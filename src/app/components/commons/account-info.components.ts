import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { DeployTokenDelegate } from '../../actions/deploy-contract.actions';

import { ContractInfo } from '../../model/clayer';
import * as selector from '../../selectors/token-create.selectors';

import { map, mergeMap, concatMap, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-token-delegate',
  templateUrl: './app-contract.component.html',
  styleUrls: ['./app-contract.component.css']
})
export class ACC {

  title = "Token Delegate";
  contract$:  Observable<ContractInfo>;

  constructor(private store: Store <ContractInfo>){
    this.contract$ = store.pipe(select(selector.selectTokenDelegate));
  }

  createToken(){
    this.store.dispatch(DeployTokenDelegate());
  }
}
