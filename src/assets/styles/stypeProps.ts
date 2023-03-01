import { green } from "@mui/material/colors";

export const styleModalWindowBox = {
    position: "absolute" as "absolute",
    top: "10%",
    left: "25%",
    // transform: "translate(-50%, -50%)",
    width: "50% ",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
};

export const styleMenuProps = {
    PaperProps: {
        style: {
            width: 250,
        },
    },
};

export const styleIconsProps = {
    //margin: "0 0 0 6px",
};

export const styleCircularProgress = {
    color: green[500],
    position: "absolute",
    // top: "50%",
    // left: "50%",
    // marginTop: "-12px",
    // marginLeft: "-12px",
};

export const styleBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 0 0 6px",
};
