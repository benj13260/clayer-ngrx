import { createAction, props } from '@ngrx/store';
import { ContractInfo, TokenDefinition } from '../model/clayer';


// Delegate
export const DeployTokenDelegate = createAction(
  '[CLayer] Create Token Delegate',
);

export const TokenDelegateCreated = createAction(
  '[CLayer] Token Delegate Created',
  props<{ contract: ContractInfo }>()
);

// Core
export const DeployTokenCore = createAction(
  '[CLayer] Deploy Token Core',
  props<{ name: string, addr : string }>()
)

export const TokenCoreCreated = createAction(
  '[CLayer] Token Core Created',
  props<{ contract: ContractInfo }>()
);

// Proxy
export const DeployTokenProxy = createAction(
  '[CLayer] Deploy Token Proxy',
  props<{ addr : string }>()
)

export const TokenProxyCreated = createAction(
  '[CLayer] Token Proxy Created',
  props<{ contract: ContractInfo }>()
);


//update
export const UpdateToken = createAction(
  '[CLayer] Update Token',
  props<{ payload: TokenDefinition}>()
)

export const TokenUpdated = createAction(
  '[CLayer] Token Updated',
  props<{ res: boolean }>()
);