import { TestBed } from '@angular/core/testing';

import { AccountsService } from './accounts.service';
import { HttpClientModule } from '@angular/common/http';

import { map , tap} from 'rxjs/operators';
import { from} from 'rxjs';

import TokenDelegateJSON from '../../assets/contracts/TokenDelegate.json'
import TokenCoreJSON from '../../assets/contracts/TokenCore.json'
import TokenProxyJSON from '../../assets/contracts/TokenProxy.json'

describe('AccountsService', () => {
  
  let srv: AccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientModule]
    });
    srv = TestBed.inject(AccountsService);
  });

  it('should be created', () => {
    expect(srv).toBeTruthy();
  });

  it('create Ethers contract factory', () => {
    let delegateFactory = srv.getContractFactory(TokenDelegateJSON);
    expect(delegateFactory.contractFactory.bytecode).toContain('0x');
  });

  it('create Ethers contract factory with payload', () => {
    let delegateFactory = srv.getContractFactory(TokenDelegateJSON, {input: 'test'});
    expect(delegateFactory.payload.input).toContain('test');
  });

  it('deploy a delegate contract', async() => {
    let delegateFactory = srv.getContractFactory(TokenDelegateJSON);
    let x =await srv.factoryDeploy(delegateFactory);
    console.log('Token Delegate Address: '+x.address);
    expect(x.address).toContain('0x')
  });
  

  it('Token creation', async() => {
    console.log('*****');
    console.log('Token creation test start : ');

    // Delegate
    // Initiate contract Factory
    let delegateF = srv.getContractFactory(TokenDelegateJSON);
    // Deploy contract
    let delegateC = await srv.factoryDeploy(delegateF);
    // Parse contract transaction
    let delegateI = srv.getContractInfo(delegateC);
    console.log('Token Delegate : '+JSON.stringify(delegateI));

    // Core
    // Initiate contract Factory
    let coreF = srv.getContractFactory(TokenCoreJSON, {name: 'My Token', addr: delegateI.address});
    // Deploy contract
    let coreC = await srv.tokenCoreDeploy(coreF);
    // Parse contract transaction
    let coreI = srv.getContractInfo(coreC);
    console.log('Token Core : '+JSON.stringify(coreI));


    // Proxy
    // Initiate contract Factory
    let proxyF = srv.getContractFactory(TokenProxyJSON, {addr: coreI.address});
    // Deploy contract
    let proxyC = await srv.tokenProxyeDeploy(proxyF);
    // Parse contract transaction
    let proxyI = srv.getContractInfo(proxyC);
    console.log('Token proxy : '+JSON.stringify(proxyI));


    expect(proxyI.address).toContain('0x')
  });

});
