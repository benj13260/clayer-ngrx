import { Action, createReducer, on } from '@ngrx/store';
import { TokenDelegateCreated, TokenCoreCreated, TokenProxyCreated } from '../actions/deploy-contract.actions';
import {TokenCreation} from '../model/clayer';

export const FeatureKey = 'token-creation';

export const initialState2 : TokenCreation = {
    status: "1"
}

const tokenCreationReducer = createReducer(
    {},
    on(TokenDelegateCreated, (state, { contract }) => ({ ...state, delegate : contract })),
    on(TokenCoreCreated, (state, { contract }) => ({ ...state, core : contract })),
    on(TokenProxyCreated, (state, { contract }) => ({ ...state, proxy : contract })),

    //State:
    on(TokenCoreCreated, (state) => ({ ...state, status : "2" })),
    on(TokenProxyCreated, (state) => ({ ...state, status : "3" })),


);


export function reducer(state: TokenCreation | undefined, action: Action) {
    console.log("Reduce state: " + JSON.stringify(state));
    console.log("Reduce action: " + JSON.stringify(action));
    return tokenCreationReducer(state, action);
}