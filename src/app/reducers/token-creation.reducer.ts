import { Action, createReducer, on } from '@ngrx/store';
import { TokenDelegateCreated, TokenCoreCreated, TokenProxyCreated, TokenUpdated } from '../actions/deploy-contract.actions';
import {TokenCreation} from '../model/clayer';

export const FeatureKey = 'token-creation';

export const initialState : TokenCreation = {
    status: "0"
}

const tokenCreationReducer = createReducer(
    initialState,
    on(TokenDelegateCreated, (state, { contract }) => ({ ...state, delegate : contract })),
    on(TokenCoreCreated, (state, { contract }) => ({ ...state, core : contract })),
    on(TokenProxyCreated, (state, { contract }) => ({ ...state, proxy : contract })),

    //Staus:
    on(TokenDelegateCreated, (state) => ({ ...state, status : "1" })),
    on(TokenCoreCreated, (state) => ({ ...state, status : "2" })),
    on(TokenProxyCreated, (state) => ({ ...state, status : "3" })),

    //on(TokenUpdated, (state) => ({ ...state, name :  state. })),


);


export function reducer(state: TokenCreation | undefined, action: Action) {
    console.log("Reduce state: " + JSON.stringify(state));
    console.log("Reduce action: " + JSON.stringify(action));
    return tokenCreationReducer(state, action);
}