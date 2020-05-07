import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TokenCreation } from '../model/clayer';
import { FeatureKey } from '../reducers/token-creation.reducer';

export const selectFeature = createFeatureSelector<TokenCreation>(FeatureKey)

//export const selectTokenDelegate = (state: TokenCreation) => state.delegate;

export const selectTokenDelegate = createSelector(
   selectFeature,
   (state: TokenCreation) => {
      return state.delegate;
   }
);

export const selectTokenDelegateAddr = createSelector(
   selectFeature,
   (state: TokenCreation) => {
      return state.delegate?.address;
   }
);

export const selectTokenCore = createSelector(
   selectFeature,
   (state: TokenCreation) => {
      return state.core;
   }
);

export const selectTokenProxy = createSelector(
   selectFeature,
   (state: TokenCreation) => {
      return state.proxy;
   }
);


export const selectStatus = createSelector(
   selectFeature,
   (state: TokenCreation) => {
      return state.status;
   }
);

