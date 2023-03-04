import "./style.css";

import { Box, Button, IconButton, Typography } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CodeIcon from "@mui/icons-material/Code";
import { colorGreenLight } from "../../assets/styles/theme";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { styleModalWindowBox } from "../../assets/styles/stypeProps";

import { CodeContent, ContactContent, InfoContent } from "./content.components";

export const MenuLayout = () => {
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [openContactModal, setOpenContactModal] = useState(false);
    const [openCodeModal, setOpenCodeModal] = useState(false);

    const iconStyle = { color: "green" };
    const swgStyle = { width: "2.5rem", height: "2.5rem" };

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "row",
                        sm: "column",
                        md: "column",
                        lg: "column",
                    },
                    paddingTop: {
                        xs: "0",
                        sm: "6rem",
                        md: "6rem",
                        lg: "6rem",
                    },
                    marginBottom: {
                        xs: "-5px",
                        sm: "0",
                        md: "0",
                        lg: "0",
                    },
                }}
            >
                <IconButton
                    aria-label="upload picture"
                    component="label"
                    style={iconStyle}
                    onClick={() => setOpenInfoModal(true)}
                >
                    <InfoOutlined style={swgStyle} />
                </IconButton>
                <IconButton
                    aria-label="upload picture"
                    component="label"
                    style={iconStyle}
                    onClick={() => setOpenCodeModal(true)}
                >
                    <CodeIcon style={swgStyle} />
                </IconButton>
                <IconButton
                    aria-label="upload picture"
                    component="label"
                    style={iconStyle}
                    onClick={() => setOpenContactModal(true)}
                >
                    <MailOutlineIcon style={swgStyle} />
                </IconButton>
            </Box>
            <Modal
                open={openInfoModal}
                onClose={() => {
                    setOpenInfoModal(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModalWindowBox}>
                    <InfoContent></InfoContent>
                </Box>
            </Modal>
            <Modal
                open={openContactModal}
                onClose={() => {
                    setOpenContactModal(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModalWindowBox}>
                    <ContactContent></ContactContent>
                </Box>
            </Modal>

            <Modal
                open={openCodeModal}
                onClose={() => {
                    setOpenCodeModal(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModalWindowBox}>
                    <CodeContent></CodeContent>
                </Box>
            </Modal>
        </div>
    );
};
