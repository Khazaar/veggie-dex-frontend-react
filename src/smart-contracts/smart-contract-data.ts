import ethers from "ethers";
import { ERC20Basic, PancakePair } from "./types";

export interface ITokenContract {
    nameLong: string;
    nameShort: string;
    address?: IAddress;
    instance?: ERC20Basic;
}
export interface IAddress {
    hardhat: string;
    bsc?: string;
    testnet?: string;
    goerli?: string;
}

export interface IPair {
    name: string;
    address: string;

    instance: PancakePair;
    token0: ITokenContract;
    token1: ITokenContract;
    reserve0: BigInt;
    reserve1: BigInt;
}
export const Apple: ITokenContract = {
    nameLong: "ERC20 Apple",
    nameShort: "APL",
    address: {
        hardhat: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        bsc: "0x8e2eF95D2e027912a6b56ebA9B348BFbe549E48f",
        testnet: "",
        goerli: "0x2757E1767543dCeC9C76ed128d3f8e86d2f3901B",
    },
};

export const Potato: ITokenContract = {
    nameLong: "ERC20 Potato",
    nameShort: "PTT",
    address: {
        hardhat: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
        bsc: "0xdc7bB1D8A9094983777075326C1c2aaD92478633",
        testnet: "",
        goerli: "0x54C569b56fbf38C8AC9942b7011a3653e5073FD4",
    },
};
export const Tomato: ITokenContract = {
    nameLong: "ERC20 Tomato",
    nameShort: "TMT",
    address: {
        hardhat: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        bsc: "0x8DFc2072BAFB3C3f7E04863844F2DF5271098320",
        testnet: "",
        goerli: "0x0A41D46f01A8A9EeBdEc130c9a926aFc4a97B6dE",
    },
};

export const LSR: ITokenContract = {
    nameLong: "ERC20 LSR",
    nameShort: "LSR",
    address: {
        hardhat: "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
        bsc: "0x8792546F835b29b0fd98E81BABd879Ad74799e3c",
        testnet: "",
        goerli: "0xe0B81076Fa915a280f03bFb746A4F5873578E287",
    },
};
export const Factory: ITokenContract = {
    nameLong: "Pancake Factory",
    nameShort: "Pancake Factory",
    address: {
        hardhat: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
        bsc: "0x313b07eE316ca75471B5E8c6Fe2871Da1eE9EE04",
        testnet: "",
        goerli: "0xB48475F43de9BF5Fcd2fce228F74F9B5F80E73F6",
    },
};

export const Router_mod = {
    address: {
        hardhat: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
        bsc: "0x912561d45a2ef38395683Cc8bf4fb6cDeb2dDd2E",
        testnet: "",
        goerli: "0x7d29E9366C3022F30a8fd72ef59CaC95BC9e8B72",
    },
};
