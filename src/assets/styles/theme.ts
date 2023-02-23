import { createTheme, ThemeProvider } from "@mui/material/styles";
export const colorGreenLight = "#1aba00";
export const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    backgroundColor: "transparent",
                    border: `3px solid ${colorGreenLight}`,
                    width: "400px",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",

                    marginTop: "12px",
                    padding: "0",
                },
            },
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: colorGreenLight,
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    margin: "0px",
                    padding: "6px 0px 0px 0px",
                    fontSize: "2.5rem",
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
                    },
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    textTransform: "uppercase",
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
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
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
    },
    typography: {
        h4: {
            color: colorGreenLight,
            fontSize: "1.5rem",
        },
        body1: {
            margin: 0,
        },
    },
});
