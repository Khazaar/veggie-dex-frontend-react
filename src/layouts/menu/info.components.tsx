import { Typography } from "@mui/material";
import { styleModalWindowBox } from "../../assets/styles/stypeProps";
import portrait from "../../assets/images/Egor-budda.jpeg";
export const InfoContent = (): JSX.Element => {
    return (
        <div>
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                align="center"
            >
                Project information
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <p>
                    Veggie dex is a Web3 app - <b>Uniswap v2 </b>fork
                    decentralized exchange with 4 listed ERC-20 tokens: Apple
                    (APL), Potato (PTT), Tomato(TMT) and LSR. Supported networks
                    are:
                    <b>Goerli, BSC Testnet and Hardhat Local</b>.
                </p>
                <p>
                    To start interraction with DEX at first time user can mint
                    some listed tokens in <b>"Mint tokens"</b> section. Balance
                    of listed tokens is shown in <b>"User assets"</b> section
                </p>
                <p>
                    You can become a liquidity provider by adding liquidity to a
                    corresponding pair in <b>"Add liquidity"</b> cection. Swap
                    tokens is available in <b>"Swap"</b> section
                </p>
                <p>
                    All available liquidity pools with corresponding reserves
                    are shown in
                    <b>"Liquidity pools"</b> section
                </p>
                <p>
                    Smart contracts of this DEX could be found at corresponding
                    <a
                        href="https://github.com/Khazaar/pancake-router"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub repository
                    </a>
                    with Hardhat project. You can use this project to connect
                    this Web3 app to <b>Hardhat Local</b> network
                </p>
            </Typography>
        </div>
    );
};
export const ContactContent = (): JSX.Element => {
    return (
        <div>
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                align="center"
            >
                Contact information
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, margin: 0 }}>
                <div className="containerContactOuter">
                    <div className="containerContactInner">
                        <img src={portrait} alt="" width="300rem" />
                    </div>
                    <div className="containerContactInner">
                        <p>
                            <b>Yoav Khazar</b>
                        </p>
                        <p>Full-stack web3 developer, Ph.D.</p>
                        <p>Solidity, Hadrhat, Brownie, Angular</p>

                        <p>
                            e-mail:
                            <a
                                href="mailto: eeguar@gmail.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                eeguar@gmail.com
                            </a>
                        </p>
                        <p>
                            Telegram
                            <a
                                href="https://telegram.me/khazaaaar"
                                target="_blank"
                                rel="noreferrer"
                            >
                                @khazaaaar
                            </a>
                        </p>
                        <p>
                            Tel:
                            <a href="+972533210038" target="_blank">
                                +972533210038
                            </a>
                        </p>
                        <p>
                            Linked-in:
                            <a
                                href="https://www.linkedin.com/in/egor-kozharinov-6361169b/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Yoav Khazar
                            </a>
                        </p>
                    </div>
                </div>
            </Typography>
        </div>
    );
};

export const CodeContent = (): JSX.Element => {
    return (
        <div>
            <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                align="center"
            >
                Code information
            </Typography>
            <Typography
                id="modal-modal-description"
                sx={{ mt: 2, margin: 0 }}
            ></Typography>
        </div>
    );
};
