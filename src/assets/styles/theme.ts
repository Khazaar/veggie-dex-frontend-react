import { Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
export const colorGreenLight = "#1aba00";
export const colorGreenLight2 = "#1ee200";
export const fontSizeMain = "1.1rem";

export let theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 500,
            md: 810,
            lg: 950,
            xl: 1920,
        },
    },
});
theme = createTheme(theme, {
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    fontSize: "1.1rem",

                    height: "2.5rem",
                    [theme.breakpoints.down("sm")]: {
                        height: "1.75rem",
                        fontSize: "0.9rem",
                    },
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
                    [theme.breakpoints.down("sm")]: {
                        width: "300px",
                    },
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: "12px",
                    marginBottom: "6px",
                    padding: "6px",
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
                    [theme.breakpoints.down("sm")]: {
                        padding: "10px 3px 10px 5px",
                    },

                    fontSize: fontSizeMain,
                },
            },
        },

        MuiTable: {
            styleOverrides: {
                root: {},
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
            //Card header
            color: colorGreenLight2,
            fontSize: "1.7rem",
            [theme.breakpoints.down("sm")]: {
                fontSize: "1.4rem",
            },
            fontWeight: "bold",
        },
        h2: {
            // fontSize: "1.1rem",
            // [theme.breakpoints.down("sm")]: {
            //     fontSize: "0.8rem",
            // },
            fontSize: { xs: 100, sm: 150, md: 150, lg: 150 },
        },
        h3: {
            color: colorGreenLight,
            fontSize: { xs: 100, sm: 150, md: 150, lg: 150 },
            margin: "0.5rem",
        },
        h4: {
            color: colorGreenLight,
            fontSize: "1rem",
        },
        h5: {
            fontSize: "0.8rem",
        },
        body1: {
            margin: 0,
        },
    },
});
