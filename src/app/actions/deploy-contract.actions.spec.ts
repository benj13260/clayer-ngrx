import * as fromDeployContract from './deploy-contract.actions';

describe('loadDeployContracts', () => {
  it('should return an action', () => {
    expect(fromDeployContract.loadDeployContracts().type).toBe('[DeployContract] Load DeployContracts');
  });
});
