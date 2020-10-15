import { ContractFactory } from 'ethers';
import { BigNumber } from 'ethers';

export interface TokenCreation {
    delegate?: ContractInfo,
    core?: ContractInfo,
    proxy?: ContractInfo,
    status?: string,
    name?: string,
    sym?: string
    balance?: BigNumber
}


export interface ContractInfo{
    address : string,
    from : string,
    block? : number,
    gasPrice : string,
    gasLimit: string,
    hash : string,
    time?: string
}

export interface TokenFactory{
    contractFactory : ContractFactory,
    payload :  any
}

export class TokenInfo{
    name: string;
    sym: string;
    dec: number;
    supply?: string;
}

export class TokenDefinition{
    coreAddr : string; 
    proxyAddr : string; 
    id: number; 
    name : string; 
    sym: string; 
    dec: number; 
}

export enum ContractType {
    core = "CORE",
    delegate = "DELEGATE",
    proxy = "PROXY"
}