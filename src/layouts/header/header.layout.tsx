import "./style.css";
import logo from "../../assets/images/Logo_2.png";
import { SelectNetworkComponent } from "../../components/selectNetwork/selectNetwork.component";
import { Box } from "@mui/material";
import { backgroundColorLight } from "../../assets/styles/theme";
import { ProfileComponent } from "../../components/profile/profile.component";

export const HeaderLayout = () => {
    return (
        <Box
            sx={{
                backgroundColor: backgroundColorLight,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "3px",
                    alignItems: "center",
                    flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                        lg: "row",
                    },
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs: "270px",
                            sm: "350px",
                            md: "350px",
                            lg: "350px",
                        },
                        marginBottom: "0px",
                        padding: "0px",
                        alignItems: "center",
                    }}
                >
                    <img className="image-wrapper" src={logo} alt="#" />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <SelectNetworkComponent></SelectNetworkComponent>
                    <ProfileComponent></ProfileComponent>
                </Box>
            </Box>
        </Box>
    );
};
