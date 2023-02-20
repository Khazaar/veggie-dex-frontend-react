export interface INetwork {
    nameShort: string;
    nameLong: string;
    nativeToken: string;
}
export const Hardhat: INetwork = {
    nameShort: "hardhat",
    nameLong: "Hardhat local",
    nativeToken: "Hardhat ETH",
};
export const BSC: INetwork = {
    nameShort: "bsc",
    nameLong: "Binance Smart Chain",
    nativeToken: "Testnet BNB",
};
export const Testnet: INetwork = {
    nameShort: "testnet",
    nameLong: "Etherium testnet",
    nativeToken: "Testnet ETH",
};

export const Goerli: INetwork = {
    nameShort: "goerli",
    nameLong: "Goerli",
    nativeToken: "Goerli ETH",
};
