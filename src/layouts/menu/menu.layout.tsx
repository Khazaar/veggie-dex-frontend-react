import "./style.css";

import {
    Box,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CodeIcon from "@mui/icons-material/Code";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useState } from "react";

import {
    CodeContent,
    ContactContent,
    InfoContent,
} from "./contentMenu.components";

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
            <Dialog
                open={openInfoModal}
                onClose={() => {
                    setOpenInfoModal(false);
                }}
                aria-labelledby="Project-modal-title"
                aria-describedby="Project-modal-description"
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle id="scroll-dialog-title">
                    Veggie dex project information
                </DialogTitle>
                <DialogContent>
                    <InfoContent></InfoContent>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openCodeModal}
                onClose={() => {
                    setOpenCodeModal(false);
                }}
                aria-labelledby="Code-modal-title"
                aria-describedby="Code-modal-description"
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle id="scroll-dialog-title">
                    Code information
                </DialogTitle>
                <DialogContent>
                    <CodeContent></CodeContent>
                </DialogContent>
            </Dialog>

            <Dialog
                open={openContactModal}
                onClose={() => {
                    setOpenContactModal(false);
                }}
                aria-labelledby="contact-modal-title"
                aria-describedby="contact-modal-description"
                fullWidth={false}
                maxWidth={"md"}
            >
                <DialogTitle id="scroll-dialog-title">Contact</DialogTitle>
                <DialogContent>
                    <ContactContent></ContactContent>
                </DialogContent>
            </Dialog>
        </div>
    );
};
