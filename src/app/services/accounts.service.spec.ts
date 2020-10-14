import { TestBed } from '@angular/core/testing';

import { AccountsService } from './accounts.service';
import { HttpClientModule } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import TokenDelegateJSON from '../../assets/contracts/TokenDelegate.json'
import TokenCoreJSON from '../../assets/contracts/TokenCore.json'
import TokenProxyJSON from '../../assets/contracts/TokenProxy.json'
import { TokenDefinition } from '../model/clayer';

describe('AccountsService', () => {

  let srv: AccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
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
    let delegateFactory = srv.getContractFactory(TokenDelegateJSON, { input: 'test' });
    expect(delegateFactory.payload.input).toContain('test');
  });

  it('deploy a delegate contract', async () => {
    let delegateFactory = srv.getContractFactory(TokenDelegateJSON);
    let x = await srv.factoryDeploy(delegateFactory);
    console.log('Token Delegate Address: ' + x.address);
    expect(x.address).toContain('0x')
  });


  it('Token creation', async () => {
    console.log('*****');
    console.log('Token creation test start : ');

    // Delegate
    // Initiate contract Factory
    let delegateF = srv.getContractFactory(TokenDelegateJSON);
    // Deploy contract
    let delegateC = await srv.factoryDeploy(delegateF);
    // Parse contract transaction
    let delegateI = srv.getContractInfo(delegateC);
    console.log('Token Delegate : ' + JSON.stringify(delegateI));

    // Core
    // Initiate contract Factory
    let coreF = srv.getContractFactory(TokenCoreJSON, { name: 'My Token', addr: delegateI.address });
    // Deploy contract
    let coreC = await srv.tokenCoreDeploy(coreF);
    // Parse contract transaction
    let coreI = srv.getContractInfo(coreC);
    console.log('Token Core : ' + JSON.stringify(coreI));


    // Proxy
    // Initiate contract Factory
    let proxyF = srv.getContractFactory(TokenProxyJSON, { addr: coreI.address });
    // Deploy contract
    let proxyC = await srv.tokenProxyDeploy(proxyF);
    // Parse contract transaction
    let proxyI = srv.getContractInfo(proxyC);
    console.log('Token proxy : ' + JSON.stringify(proxyI));


    let def: TokenDefinition = new TokenDefinition();
    def.coreAddr = coreI.address;
    def.proxyAddr = proxyI.address;
    def.id = 0;  // Delegate row num in Array of delegates used to create a core
    def.name = 'Benj Token';
    def.sym = 'BEN';
    def.dec = 18;

    
    console.log("Bal before token update: "+await srv.getBalance(srv.acc))
    
    // A transaction is created to update the core
    let updTokenCoreTrx = await srv.updateTokenCore(def, TokenCoreJSON);

    //console.log("Bal after token update: "+await srv.getBalance(srv.acc);)
    
    console.log("tx update core: " + JSON.stringify(updTokenCoreTrx.hash));

    let name = await srv.getName(proxyI.address);
    console.log("Name: "+name);
    expect(name).toEqual(def.name);



    let balAcc0 = await srv.getBalance(srv.accounts[0]);
    let balAcc1 = await srv.getBalance(srv.accounts[1]);
    let balAcc2 = await srv.getBalance(srv.accounts[2]);
    console.log("balance account 0 "+balAcc0);
    console.log("balance account1 "+balAcc1);

    expect(proxyI.address).toContain('0x')
    let supply = "42".padEnd(18, "0")
    await srv.mintTokens(def.coreAddr, def.proxyAddr, supply);

    console.log("Supply: " + await srv.totalSupply(def.proxyAddr));

    balAcc0 = await srv.getBalanceOf(proxyI.address,srv.accounts[0]);
    balAcc1 = await srv.getBalanceOf(proxyI.address,srv.accounts[1]);
    console.log("balance of Ben 0 "+balAcc0);
    console.log("balance of Ben 1 "+balAcc1);

    //Transfer
    console.log("Transfer...");

    await srv.transferFrom(def.proxyAddr, srv.accounts[0], srv.accounts[1], 10);

    balAcc0 = await srv.getBalanceOf(proxyI.address,srv.accounts[0]);
    balAcc1 = await srv.getBalanceOf(proxyI.address,srv.accounts[1]);
    console.log("balance of Ben 0 "+balAcc0);
    console.log("balance of Ben 1 "+balAcc1);

  });

});
