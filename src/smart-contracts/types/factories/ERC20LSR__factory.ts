/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { ERC20LSR, ERC20LSRInterface } from "../ERC20LSR";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "mintLimitAmount",
        type: "uint256",
      },
    ],
    name: "MintLimitAmountSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "mintLimitPeriodSeconds",
        type: "uint256",
      },
    ],
    name: "MintLimitPeriodSecondsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "askedAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "mintLimitAmount",
        type: "uint256",
      },
    ],
    name: "MintRevertedAmount",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "timePassedSeconds",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "mintLimitPeriodSeconds",
        type: "uint256",
      },
    ],
    name: "MintRevertedPeriod",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OWNER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnAllTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMintLimitAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMintLimitPeriodSeconds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "askedAmount",
        type: "uint256",
      },
    ],
    name: "getTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastMint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "mintedInPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mintLimitAmount",
        type: "uint256",
      },
    ],
    name: "setMintLimitAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "mintLimitPeriodSeconds",
        type: "uint256",
      },
    ],
    name: "setMintLimitPeriodSeconds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6001556040518060400160405280600581526020017f4c617365720000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4c5352000000000000000000000000000000000000000000000000000000000081525081818160049080519060200190620000ae929190620005f1565b508060059080519060200190620000c7929190620005f1565b5050506200012260405160200180807f4f574e4552000000000000000000000000000000000000000000000000000000815250600501905060405160208183030381529060405280519060200120336200015160201b60201c565b62000136620f42406200016760201b60201c565b620001496102586200026b60201b60201c565b5050620006a0565b6200016382826200036f60201b60201c565b5050565b620001bf60405160200180807f4f574e455200000000000000000000000000000000000000000000000000000081525060050190506040516020818303038152906040528051906020012033620003b760201b60201c565b62000232576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f416472657373206973206e6f74206f776e65720000000000000000000000000081525060200191505060405180910390fd5b80600a81905550600a547f497e616c96a0edbac83e14a625cde2e6fb741219e59c489f537548ac1759f36260405160405180910390a250565b620002c360405160200180807f4f574e455200000000000000000000000000000000000000000000000000000081525060050190506040516020818303038152906040528051906020012033620003b760201b60201c565b62000336576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f416472657373206973206e6f74206f776e65720000000000000000000000000081525060200191505060405180910390fd5b80600b81905550600b547fe6aa872bf278f604c728751a1c94366dd0aa3472611af09b03a0222e4c83a11f60405160405180910390a250565b6200038682826200042260201b620020c41760201c565b620003b281600760008581526020019081526020016000206200051460201b620021a51790919060201c565b505050565b60006006600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b620004348282620003b760201b60201c565b620005105760016006600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620004b56200054c60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600062000544836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6200055460201b60201c565b905092915050565b600033905090565b6000620005688383620005ce60201b60201c565b620005c3578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050620005c8565b600090505b92915050565b600080836001016000848152602001908152602001600020541415905092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200063457805160ff191683800117855562000665565b8280016001018555821562000665579182015b828111156200066457825182559160200191906001019062000647565b5b50905062000674919062000678565b5090565b6200069d91905b80821115620006995760008160009055506001016200067f565b5090565b90565b61289a80620006b06000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c806391d14854116100f9578063c3e7107a11610097578063d547741f11610071578063d547741f14610905578063dd62ed3e14610953578063e58378bb146109cb578063fefdcce9146109e9576101c4565b8063c3e7107a14610867578063ca15c87314610895578063d3c9cc26146108d7576101c4565b8063a457c2d7116100d3578063a457c2d714610739578063a9059cbb1461079f578063adc20b1c14610805578063c17e2aa11461085d576101c4565b806391d148541461063257806395d89b4114610698578063a217fddf1461071b576101c4565b8063313ce567116101665780636f7ca2a6116101405780636f7ca2a6146104ec57806370a082311461050a5780638f1550f5146105625780639010d07c146105ba576101c4565b8063313ce5671461041457806336568abe146104385780633950935114610486576101c4565b806318160ddd116101a257806318160ddd146102e057806323b872dd146102fe578063248a9ca3146103845780632f2ff15d146103c6576101c4565b806306fdde03146101c9578063095ea7b31461024c5780630e8b75c5146102b2575b600080fd5b6101d1610a07565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102115780820151818401526020810190506101f6565b50505050905090810190601f16801561023e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102986004803603604081101561026257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610aa9565b604051808215151515815260200191505060405180910390f35b6102de600480360360208110156102c857600080fd5b8101908080359060200190929190505050610acc565b005b6102e8610bc7565b6040518082815260200191505060405180910390f35b61036a6004803603606081101561031457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610bd1565b604051808215151515815260200191505060405180910390f35b6103b06004803603602081101561039a57600080fd5b8101908080359060200190929190505050610c00565b6040518082815260200191505060405180910390f35b610412600480360360408110156103dc57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c20565b005b61041c610c41565b604051808260ff1660ff16815260200191505060405180910390f35b6104846004803603604081101561044e57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610c4a565b005b6104d26004803603604081101561049c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ce3565b604051808215151515815260200191505060405180910390f35b6104f4610d11565b6040518082815260200191505060405180910390f35b61054c6004803603602081101561052057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d1b565b6040518082815260200191505060405180910390f35b6105a46004803603602081101561057857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610d63565b6040518082815260200191505060405180910390f35b6105f0600480360360408110156105d057600080fd5b810190808035906020019092919080359060200190929190505050610d7b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61067e6004803603604081101561064857600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610daa565b604051808215151515815260200191505060405180910390f35b6106a0610e15565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106e05780820151818401526020810190506106c5565b50505050905090810190601f16801561070d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610723610eb7565b6040518082815260200191505060405180910390f35b6107856004803603604081101561074f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610ebe565b604051808215151515815260200191505060405180910390f35b6107eb600480360360408110156107b557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610f4b565b604051808215151515815260200191505060405180910390f35b6108476004803603602081101561081b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f6e565b6040518082815260200191505060405180910390f35b610865610f86565b005b6108936004803603602081101561087d57600080fd5b8101908080359060200190929190505050611025565b005b6108c1600480360360208110156108ab57600080fd5b8101908080359060200190929190505050611120565b6040518082815260200191505060405180910390f35b610903600480360360208110156108ed57600080fd5b8101908080359060200190929190505050611144565b005b6109516004803603604081101561091b57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506112d1565b005b6109b56004803603604081101561096957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506112f2565b6040518082815260200191505060405180910390f35b6109d3611379565b6040518082815260200191505060405180910390f35b6109f16113c3565b6040518082815260200191505060405180910390f35b606060048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a9f5780601f10610a7457610100808354040283529160200191610a9f565b820191906000526020600020905b815481529060010190602001808311610a8257829003601f168201915b5050505050905090565b600080610ab46113cd565b9050610ac18185856113d5565b600191505092915050565b610b1c60405160200180807f4f574e455200000000000000000000000000000000000000000000000000000081525060050190506040516020818303038152906040528051906020012033610daa565b610b8e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f416472657373206973206e6f74206f776e65720000000000000000000000000081525060200191505060405180910390fd5b80600a81905550600a547f497e616c96a0edbac83e14a625cde2e6fb741219e59c489f537548ac1759f36260405160405180910390a250565b6000600354905090565b600080610bdc6113cd565b9050610be98582856115cc565b610bf485858561166d565b60019150509392505050565b600060066000838152602001908152602001600020600101549050919050565b610c2982610c00565b610c3281611927565b610c3c838361193b565b505050565b60006003905090565b610c526113cd565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610cd5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602f815260200180612836602f913960400191505060405180910390fd5b610cdf828261196f565b5050565b600080610cee6113cd565b9050610d06818585610d0085896112f2565b016113d5565b600191505092915050565b6000600b54905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60096020528060005260406000206000915090505481565b6000610da282600760008681526020019081526020016000206119a390919063ffffffff16565b905092915050565b60006006600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b606060058054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ead5780601f10610e8257610100808354040283529160200191610ead565b820191906000526020600020905b815481529060010190602001808311610e9057829003601f168201915b5050505050905090565b6000801b81565b600080610ec96113cd565b90506000610ed782866112f2565b905083811015610f32576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806128116025913960400191505060405180910390fd5b610f3f82868684036113d5565b60019250505092915050565b600080610f566113cd565b9050610f6381858561166d565b600191505092915050565b60086020528060005260406000206000915090505481565b6000610f9133610d1b565b9050610fd16040518060400160405280600781526020017f4275726e696e67000000000000000000000000000000000000000000000000008152506119bd565b610fda81611abb565b6110186040518060400160405280600681526020017f546f6b656e7300000000000000000000000000000000000000000000000000008152506119bd565b6110223382611b54565b50565b61107560405160200180807f4f574e455200000000000000000000000000000000000000000000000000000081525060050190506040516020818303038152906040528051906020012033610daa565b6110e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f416472657373206973206e6f74206f776e65720000000000000000000000000081525060200191505060405180910390fd5b80600b81905550600b547fe6aa872bf278f604c728751a1c94366dd0aa3472611af09b03a0222e4c83a11f60405160405180910390a250565b600061113d60076000848152602001908152602001600020611d4e565b9050919050565b6000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205442039050600a54821115611202576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f506c6561736520646f206e6f7420657863656564206d696e7420616d6f756e7481525060200191505060405180910390fd5b600b54811161127e57600b54817f3575634f95379270868859f269e5f9724edbc8629ef2c578bc6a49df0a4adbe260405160405180910390a36112796040518060400160405280601b81526020017f506c65617365207761697420666f72206d696e7420706572696f6400000000008152506119bd565b6112cd565b6112883383611d63565b42600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5050565b6112da82610c00565b6112e381611927565b6112ed838361196f565b505050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60405160200180807f4f574e455200000000000000000000000000000000000000000000000000000081525060050190506040516020818303038152906040528051906020012081565b6000600a54905090565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561145b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806127ed6024913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156114e1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061275f6022913960400191505060405180910390fd5b80600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a3505050565b60006115d884846112f2565b905060015481146116675781811015611659576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000081525060200191505060405180910390fd5b61166684848484036113d5565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156116f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260258152602001806127c86025913960400191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611779576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602381526020018061271a6023913960400191505060405180910390fd5b611784838383611ee4565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611820576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260268152602001806127816026913960400191505060405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3611921848484611ee9565b50505050565b611938816119336113cd565b611eee565b50565b61194582826120c4565b61196a81600760008581526020019081526020016000206121a590919063ffffffff16565b505050565b61197982826121d5565b61199e81600760008581526020019081526020016000206122b790919063ffffffff16565b505050565b60006119b283600001836122e7565b60001c905092915050565b611ab8816040516024018080602001828103825283818151815260200191508051906020019080838360005b83811015611a045780820151818401526020810190506119e9565b50505050905090810190601f168015611a315780820380516001836020036101000a031916815260200191505b50925050506040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061230b565b50565b611b5181604051602401808281526020019150506040516020818303038152906040527ff82c50f1000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061230b565b50565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611bda576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260218152602001806127a76021913960400191505060405180910390fd5b611be682600083611ee4565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611c82576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602281526020018061273d6022913960400191505060405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600360008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3611d4983600084611ee9565b505050565b6000611d5c82600001612334565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611e06576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601f8152602001807f45524332303a206d696e7420746f20746865207a65726f20616464726573730081525060200191505060405180910390fd5b611e1260008383611ee4565b80600360008282540192505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3611ee060008383611ee9565b5050565b505050565b505050565b611ef88282610daa565b6120c057611f0581612345565b611f138360001c6020612372565b60405160200180807f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081525060170183805190602001908083835b60208310611f715780518252602082019150602081019050602083039250611f4e565b6001836020036101000a038019825116818451168082178552505050505050905001807f206973206d697373696e6720726f6c652000000000000000000000000000000081525060110182805190602001908083835b60208310611fea5780518252602082019150602081019050602083039250611fc7565b6001836020036101000a038019825116818451168082178552505050505050905001925050506040516020818303038152906040526040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561208557808201518184015260208101905061206a565b50505050905090810190601f1680156120b25780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5050565b6120ce8282610daa565b6121a15760016006600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506121466113cd565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b60006121cd836000018373ffffffffffffffffffffffffffffffffffffffff1660001b612599565b905092915050565b6121df8282610daa565b156122b35760006006600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506122586113cd565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b60006122df836000018373ffffffffffffffffffffffffffffffffffffffff1660001b612609565b905092915050565b60008260000182815481106122f857fe5b9060005260206000200154905092915050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b600081600001805490509050919050565b606061236b8273ffffffffffffffffffffffffffffffffffffffff16601460ff16612372565b9050919050565b6060806002836002020167ffffffffffffffff8111801561239257600080fd5b506040519080825280601f01601f1916602001820160405280156123c55781602001600182028036833780820191505090505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106123f657fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f78000000000000000000000000000000000000000000000000000000000000008160018151811061245357fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006001846002020190505b6001811115612518577f3031323334353637383961626364656600000000000000000000000000000000600f8616601081106124c657fe5b1a60f81b8282815181106124d657fe5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c94508060019003905061248e565b506000841461258f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f537472696e67733a20686578206c656e67746820696e73756666696369656e7481525060200191505060405180910390fd5b8091505092915050565b60006125a583836126f6565b6125fe578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050612603565b600090505b92915050565b600080836001016000848152602001908152602001600020549050600081146126ea5760006001820390506000600186600001805490500390508181146126a257600086600001828154811061265b57fe5b906000526020600020015490508087600001848154811061267857fe5b90600052602060002001819055508387600101600083815260200190815260200160002081905550505b856000018054806126af57fe5b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506126f0565b60009150505b92915050565b60008083600101600084815260200190815260200160002054141590509291505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a2646970667358221220e1fe95805b1b44b04f11c0960b4df0f1443889a0400cedac3bdcd1bd7ce0399a64736f6c63430006060033";

type ERC20LSRConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20LSRConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20LSR__factory extends ContractFactory {
  constructor(...args: ERC20LSRConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC20LSR> {
    return super.deploy(overrides || {}) as Promise<ERC20LSR>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC20LSR {
    return super.attach(address) as ERC20LSR;
  }
  override connect(signer: Signer): ERC20LSR__factory {
    return super.connect(signer) as ERC20LSR__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20LSRInterface {
    return new utils.Interface(_abi) as ERC20LSRInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20LSR {
    return new Contract(address, _abi, signerOrProvider) as ERC20LSR;
  }
}
