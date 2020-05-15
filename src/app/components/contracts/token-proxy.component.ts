import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DeployTokenProxy } from '../../actions/deploy-contract.actions'
import { select, Store } from '@ngrx/store';
import { TokenCreation, ContractInfo } from '../../model/clayer';
import * as fromTokenCreationSelector from '../../selectors/token-create.selectors';


@Component({
    selector: 'app-token-proxy',
    templateUrl: './app-contract.component.html',
    styleUrls: ['./app-contract.component.css']
  })
export class TokenProxyComponent {

  title = "Token Proxy";
  tokenName = "My token proxy";
  contract$: Observable<ContractInfo>; 
  
  // Core token address used for deployment
  coreContract$: Observable<ContractInfo>;
  
  constructor(private store: Store <TokenCreation>){
    this.coreContract$ = store.pipe(select(fromTokenCreationSelector.selectTokenCore));
    this.contract$ = store.pipe(select(fromTokenCreationSelector.selectTokenProxy));
  }

  createToken(){
   let addr : string;
   this.coreContract$.forEach(x =>addr = x.address);
   this.store.dispatch(DeployTokenProxy({addr: addr}));
  }
}