import * as fromDeployContract from './deploy-contract.actions';
import {TokenDefinition} from '../model/clayer'


describe('loadDeployContracts', () => {
  it('should return an action', () => {
    let t : TokenDefinition = new TokenDefinition();
    t.coreAddr = '0x20D24591ea888410B48BcB415A073EcA649e962F';
    t.dec = 18;
    t.sym ='BEN';
    t.name ='Ben token';
    t.proxyAddr ='0x9Da68bc33edF42aF64d05BdCDf252e799FDF76bC';
    t.id=0;
    fromDeployContract.UpdateToken({payload: t}); //.toBe('[CLayer] Update Token');
  });
});
