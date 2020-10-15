import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers, Wallet, ContractFactory, Contract, utils, BigNumber, providers } from 'ethers';
import { ContractInfo, TokenFactory, TokenDefinition, ContractType } from '../model/clayer';

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
  ethersProvider: providers.JsonRpcProvider;


  chainURL = "http://localhost:7545"; // Ganache UI 
  //chainURL = "http://localhost:8545"; // Bash

  wallet: Wallet;

  cmap = new Map<string, any>();

  delegateToken : Contract;
  coreToken : Contract;
  proxyToken : Contract;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.ethersProvider = new ethers.providers.JsonRpcProvider(this.chainURL);

    this.accounts.push('0x26eECCAE5E64f92Bd7cB408596D4eE09c7a22225');
    this.accounts.push('0x282A3468AbE15c6Cff9c10ba5A97F404c94267b6');
    this.accounts.push('0x994246Ba133928c6B20ACdCee937DBAb1F70F5C5');

    this.acc = this.accounts[0];
    this.prv.push('0x3011c3dfa7f8cc967ed53d37e8dc9f5ad8e1caa3ecb4a5bc03aab25524658ac8');

    this.wallet = new ethers.Wallet(this.prv[0], this.ethersProvider);


    this.cmap.set('TokenDelegate', TokenDelegateJSON);
    this.cmap.set('TokenCore', TokenCoreJSON);
    this.cmap.set('TokenProxy', TokenProxyJSON);


  }

  getAccounts(): string[] {
    return this.accounts;
  }

  /**
   * Return the balance of an account
   * @param acc 
   */
  async getBalance(acc: string): Promise<string> {
    let a = await this.ethersProvider.getBalance(acc);
    return ethers.utils.formatEther(a);
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
  getContractFactory(cSol, payload?: any): TokenFactory {
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
  async tokenProxyDeploy(tokenFactory: TokenFactory): Promise<Contract> {
    try {
      return await tokenFactory.contractFactory.deploy(tokenFactory.payload.addr);
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }


  async mintTokens(addrCore : string, addrProxy : string, supply : string){
    let core = this.connectCore(addrCore)
    await core.mint(addrProxy, this.acc, supply)
  }

  /**
   * Update token 
   * @param payload 
   */
  async updateTokenCore(payload: TokenDefinition, c: any): Promise<any> {
    try {

      //let coreContract = new ethers.Contract(payload.coreAddr, c.abi, this.ethersProvider);
      //let contractWithSigner = coreContract.connect(this.wallet);
      
      let contractWithSigner = this.connectCore(payload.coreAddr)
      return await contractWithSigner.defineToken(payload.proxyAddr, 0, payload.name, payload.sym, payload.dec);
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }


  async getName(addr?: string): Promise<string> {
    let contractWithSigner = this.connectProxy(addr)
    return await contractWithSigner.name();
  }

  async getBalanceOf(addrProxyContract : string, addrOwner? : string ) : Promise<string>{
    let contractWithSigner = this.connectProxy(addrProxyContract);
    return await //ethers.utils.formatEther
      contractWithSigner.balanceOf(addrOwner); //        addrOwner != null ? this.acc : addrOwner)
    //);
  }

  async totalSupply(addrProxyContract : string ) : Promise<string>{
    let contractWithSigner = this.connectProxy(addrProxyContract);
    return await //ethers.utils.formatEther(
      contractWithSigner.totalSupply(); //        addrOwner != null ? this.acc : addrOwner)
    //);
  }

  async transfer(addrProxyContract : string, addressTo : string, value : number) : Promise<boolean>{
    let contractWithSigner = this.connectProxy(addrProxyContract);
    let b = BigNumber.from("1");
    return await //ethers.utils.formatEther(  
      contractWithSigner.transfer( addressTo, value); //        addrOwner != null ? this.acc : addrOwner)
    //);
  }

  // Probably need to allow address first
  async transferFrom(addrProxyContract : string, addressFrom : string, addressTo : string, value : number) : Promise<boolean>{
    let contractWithSigner = this.connectProxy(addrProxyContract);
    let b = BigNumber.from("1");
    //let g = contractWithSigner.estimateGas.transferFrom(addressFrom, addressTo, value);
    //console.log(" Gas :"+ (await g).toString);
    return await //ethers.utils.formatEther(
  
      contractWithSigner.transferFrom(addressFrom, addressTo, value); //        addrOwner != null ? this.acc : addrOwner)
    //);
  }
  
  connectContract(contractType : ContractType, addr : string) : Contract{
    let c : Contract;
    switch (contractType) {
      case ContractType.core:
          if (this.coreToken != null && this.coreToken.address == addr){
            c = this.coreToken;
          } else {
            c = new ethers.Contract(addr, TokenCoreJSON.abi, this.ethersProvider);
            this.coreToken = c;           
          }
        break;
        case ContractType.proxy:
          if (this.proxyToken != null && this.proxyToken.address == addr){
            c = this.proxyToken;
          } else {
            c = new ethers.Contract(addr, TokenProxyJSON.abi, this.ethersProvider);
            this.proxyToken = c;           
          }
        break;
        case ContractType.delegate:
          if (this.delegateToken != null && this.delegateToken.address == addr){
            c = this.delegateToken;
          } else {
            c = new ethers.Contract(addr, TokenDelegateJSON.abi, this.ethersProvider);
            this.delegateToken = c;           
          }
        break;
    }
    if (c!= null){
      return c.connect(this.wallet);
    }
    return null;
  }

  connectCore(addr : string){
      return this.connectContract(ContractType.core, addr);
  }

  connectProxy(addr : string){
    return this.connectContract(ContractType.proxy, addr);
  }

  connectDelegate(addr : string){
    return this.connectContract(ContractType.delegate, addr);
  }


}
