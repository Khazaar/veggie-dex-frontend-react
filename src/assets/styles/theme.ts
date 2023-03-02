import { createTheme } from "@mui/material/styles";
export const colorGreenLight = "#1aba00";
export const colorGreenLight2 = "#1ee200";
export const fontSizeMain = "1.1rem";

export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    fontSize: fontSizeMain,
                    height: "2.5rem",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 25,
                    backgroundColor: "transparent",
                    border: `3px solid ${colorGreenLight}`,
                    width: "400px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",

                    marginTop: "12px",
                    marginBottom: "6px",
                    padding: "0",
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: colorGreenLight2,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    margin: "0.5rem",
                    padding: "6px 0px 0px 0px",
                    variant: "h1",
                },
            },
        },

        MuiCardContent: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",

                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: "0",
                    padding: "0 0 0 0",
                    "&:last-child": {
                        paddingBottom: 10,
                    },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    textTransform: "uppercase",
                    backgroundColor: "white",
                    width: "100%",
                    borderRadius: "10px",

                    "& .MuiFilledInput-underline:after": {
                        borderBottomColor: colorGreenLight,
                        margin: "0 8px 0 8px",
                        borderColor: colorGreenLight,
                    },
                    "& .MuiFilledInput-border:after": {
                        borderColor: colorGreenLight,
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    textTransform: "uppercase",
                    fontSize: fontSizeMain,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    "& .MuiFilledInput-underline:after": {
                        borderBottomColor: colorGreenLight,
                        margin: "0 8px 0 8px",
                    },
                    fontSize: fontSizeMain,
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    fontSize: "1.5rem",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    fontSize: fontSizeMain,
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": { color: "green" },
                },
            },
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    "& :hover": {
                        color: colorGreenLight,
                    },
                },
            },
        },
    },
    typography: {
        h1: {
            color: colorGreenLight2,
            fontSize: "1.7rem",
            fontWeight: "bold",
        },
        h3: {
            color: colorGreenLight,
            fontSize: "1.5rem",
            margin: "0.5rem",
        },
        h4: {
            color: colorGreenLight,
            fontSize: "1rem",
        },
        body1: {
            margin: 0,
        },
    },
});
