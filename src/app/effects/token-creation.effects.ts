import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, concatMap, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import {
  DeployTokenDelegate, TokenDelegateCreated,
  DeployTokenCore, TokenCoreCreated,
  DeployTokenProxy, TokenProxyCreated,
  UpdateToken, TokenUpdated
} from '../actions/deploy-contract.actions';
import { AccountsService } from '../services/accounts.service';
import TokenDelegateJSON from '../../assets/contracts/TokenDelegate.json'
import TokenCoreJSON from '../../assets/contracts/TokenCore.json'
import TokenProxyJSON from '../../assets/contracts/TokenProxy.json'
import { Contract } from 'ethers';


@Injectable()
export class TokenCreationEffects {

  /**
   *   Deploy a token Delegate
   *   Return action Token Delegate Created
   */
  createDelegateToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeployTokenDelegate),
      map(() => this.srv.getContractFactory(TokenDelegateJSON)),
      switchMap(tokenFactory =>
        from(this.srv.factoryDeploy(tokenFactory))
          .pipe(
            map(x => this.srv.getContractInfo(x)),
            map(x => TokenDelegateCreated({ contract: x }))
          )
      ),
    ));

  /**
   *   Deploy a token Core
   *   Return action Token Core Created
   */
  createCoreToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeployTokenCore),
      map((_payload) => this.srv.getContractFactory(TokenCoreJSON, _payload)),
      switchMap(tokenFactory =>
        from(this.srv.tokenCoreDeploy(tokenFactory))
          .pipe(
            map(x => this.srv.getContractInfo(x)),
            map(x => TokenCoreCreated({ contract: x }))
          )
      ),
    ));

  /**
   *   Deploy a token Core
   *   Return action Token Core Created
   */
  createProxyToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeployTokenProxy),
      map((_payload) => this.srv.getContractFactory(TokenProxyJSON, _payload)),
      switchMap(tokenFactory =>
        from(this.srv.tokenProxyDeploy(tokenFactory))
          .pipe(
            map(x => this.srv.getContractInfo(x)),
            map(x => TokenProxyCreated({ contract: x }))
          )
      ),
    ));


  /**
   *   Define a token
   *   Return boolean
   */
  updateTokenCore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateToken),
      switchMap(_payload =>
        from(this.srv.updateTokenCore(_payload.payload, TokenCoreJSON))
          .pipe(
            //map(x => this.srv.getContractInfo(x)),
            map(x => TokenUpdated({ res: true }))
          )
      ),
    ));

  TokenUpdated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TokenUpdated),
      switchMap(() =>
        from(this.srv.getName()).pipe(
          map(x => console.log('TokenUpdated ' + x))
        )
      )
    ),
    { dispatch: false }
  );


  constructor(private actions$: Actions, private srv: AccountsService, private store: Store) { }

}