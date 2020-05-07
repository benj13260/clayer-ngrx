import { ContractFactory } from 'ethers';

export interface TokenCreation {
    delegate?: ContractInfo,
    core?: ContractInfo,
    proxy?: ContractInfo,
    status?: string
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