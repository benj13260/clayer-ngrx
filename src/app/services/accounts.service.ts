import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers, Wallet, ContractFactory, Contract, utils} from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import { ContractInfo, TokenFactory, TokenDefinition } from '../model/clayer';

import TokenDelegateJSON from '../../assets/contracts/TokenDelegate.json'
import TokenCoreJSON from '../../assets/contracts/TokenCore.json'
import TokenProxyJSON from '../../assets/contracts/TokenProxy.json'


@Injectable({
  providedIn: 'root'
})

export class AccountsService {

  accounts: string[] = [];
  acc: string
  prv: string[] = [];
  httpClient: HttpClient;
  ethersProvider: JsonRpcProvider;


  chainURL = "http://localhost:7545"; // Ganache UI 
  //chainURL = "http://localhost:8545"; // Bash
  
  wallet: Wallet;

  cmap = new Map<string, any>(); 


  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.ethersProvider = new ethers.providers.JsonRpcProvider(this.chainURL);

    this.accounts.push('0x26eECCAE5E64f92Bd7cB408596D4eE09c7a22225');
    this.accounts.push('0x282A3468AbE15c6Cff9c10ba5A97F404c94267b6');
    this.accounts.push('0x994246Ba133928c6B20ACdCee937DBAb1F70F5C5');

    this.acc = this.accounts[0];
    this.prv.push('0x3011c3dfa7f8cc967ed53d37e8dc9f5ad8e1caa3ecb4a5bc03aab25524658ac8');

    this.wallet = new ethers.Wallet(this.prv[0], this.ethersProvider);

    
    this.cmap.set('TokenDelegate',TokenDelegateJSON);
    this.cmap.set('TokenCore',TokenCoreJSON);
    this.cmap.set('TokenProxy',TokenProxyJSON);


  }

  getAccounts(): string[] {
    return this.accounts;
  }

  /**
   * Return the balance of an account
   * @param acc 
   */
  getBalance(acc: string): string {
    this.ethersProvider.getBalance(acc).then
      (balance => {
        return ethers.utils.formatEther(balance)
      });
    return null;
  }

  getContractInfo(c: Contract): ContractInfo {


    return {
      address: c.address,
      from: c.deployTransaction.from,
      block: c.deployTransaction.blockNumber,
      gasLimit: c.deployTransaction.gasLimit.toString(),
      gasPrice: c.deployTransaction.gasPrice.toString(),
      hash: c.deployTransaction.hash,
      //time: c.deployTransaction.timestamp,
      //time : formatDate(c.deployTransaction.timestamp,'long','us-US'),
    }
  }

  /**
   *  Retrieve JSON solidity contract
   * @param url of the contract
   */
  //getContract(url: string) {
  //  return this.httpClient.get(url);
  //}

  /**
   * Create a Contract Factory based on the solidy contract JSON object.
   * @param cSol JSON object
   */
  getContractFactory(cSol , payload? : any): TokenFactory {
    let fac = new ethers.ContractFactory(cSol.abi, cSol.bytecode, this.wallet);
    return {
      contractFactory: fac,
      payload: payload
    };
  }


  /**
  * Deploy a Factory Contract to eth
  * @param tokenFactory the factory to deploy
  */
  async factoryDeploy(tokenFactory: TokenFactory): Promise<Contract> {
    try {
      return await tokenFactory.contractFactory.deploy();
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * Deploy a token Core contract from the factory
   * @param tokenFactory 
   */
  async tokenCoreDeploy(tokenFactory: TokenFactory): Promise<Contract> {
    let argsAddr: string[] = new Array();
    argsAddr.push(tokenFactory.payload.addr);
    try {
      return await tokenFactory.contractFactory.deploy(tokenFactory.payload.name, argsAddr);
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }

  /**
   * Deploy a token Core contract from the factory
   * @param tokenFactory 
   */
  async tokenProxyeDeploy(tokenFactory: TokenFactory): Promise<Contract> {
    //let argsAddr: string[] = new Array();
    //argsAddr.push(tokenFactory.payload.addr);
    
    try {
      return await tokenFactory.contractFactory.deploy(tokenFactory.payload.addr);
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }
z
  /**
   * Update token 
   * @param payload 
   */
  async updateTokenCore(payload: TokenDefinition, c: any): Promise<Boolean> {
    try {
      console.log("payload.coreAddr: "+payload.coreAddr+",  c.abi"+c.abi);
      let coreContract = new ethers.Contract(payload.coreAddr, c.abi, this.ethersProvider);
      let contractWithSigner = coreContract.connect(this.wallet);
      
      let tx = await contractWithSigner.defineToken(payload.proxyAddr, 0, payload.name, payload.sym, payload.dec);
      console.log("tx: "+JSON.stringify(tx))
      return true;
    }
    catch (err) {
      console.log(err);
      return false;
    }
  }


  async getName(addr: string): Promise<string>{
    let a ='0xbED67Ea4C500E2bEA4b8AEC7B57E17664222340A';
    let proxyContract = new ethers.Contract(a, TokenProxyJSON.abi, this.ethersProvider);
    let contractWithSigner = proxyContract.connect(this.wallet);
    let n =  await contractWithSigner.name();
    console.log("n: "+n);
    let b =  await contractWithSigner.balanceOf(this.acc);
    
    console.log("b: "+b);
    return n;

  }


}
