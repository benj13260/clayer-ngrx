import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { TokenCreation, ContractInfo } from './model/clayer';
import * as fromTokenCreationSelector from './selectors/token-create.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  status$ : Observable<string>;
  constructor(private store: Store <TokenCreation>){
    this.status$ = store.pipe(select(fromTokenCreationSelector.selectStatus));
  }
}
