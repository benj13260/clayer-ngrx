import { createAction, props } from '@ngrx/store';
import { ContractInfo } from '../model/clayer';



export const DeployTokenDelegate = createAction(
  '[CLayer] Create Token Delegate',
);

export const TokenDelegateCreated = createAction(
  '[CLayer] Token Delegate Created',
  props<{ contract: ContractInfo }>()
);

export const DeployTokenCore = createAction(
  '[CLayer] Deploy Token Core',
  props<{ name: string, addr : string }>()
)

export const TokenCoreCreated = createAction(
  '[CLayer] Token Core Created',
  props<{ contract: ContractInfo }>()
);


export const DeployTokenProxy = createAction(
  '[CLayer] Deploy Token Proxy',
  props<{ addr : string }>()
)

export const TokenProxyCreated = createAction(
  '[CLayer] Token Proxy Created',
  props<{ contract: ContractInfo }>()
);