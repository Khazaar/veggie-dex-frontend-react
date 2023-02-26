import { useContext, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";

import "./style.css";
import "../../assets/styles/styles.css";

import { styleIconsProps } from "../../assets/styles/stypeProps";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { colorGreenLight } from "../../assets/styles/theme";
import { useAdminRolesSubscription } from "../../hooks";

export const OwnerPanelComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);

    const [admins, setAdmins] = useState<string[]>([]);
    const [selectedAdmin, setSelectedAdmin] = useState<string>("");
    const [newAdmin, setNewAdmin] = useState<string>("");

    const clickRevokeAdmin = async () => {
        console.log(`Going to revoke admin role from ${selectedAdmin}`);
        await smartContractService.revokeAdminRole(selectedAdmin);
    };

    const clickGrantAdmin = async () => {
        console.log(`Going to grant admin role to ${newAdmin}`);
        await smartContractService.grantAdminRole(newAdmin);
    };

    const fetchData = async () => {
        setAdmins(await smartContractService.getRouterAdmins());
        if (admins.length > 0) {
            setSelectedAdmin(admins[0]);
        }
    };
    useAdminRolesSubscription(smartContractService, fetchData);

    return (
        <Card className="AdminPanelComponent">
            <CardHeader
                title="Owner Panel"
                titleTypographyProps={{ variant: "h1" }}
            ></CardHeader>
            <CardContent>
                <div className="newAdminWrapper">
                    <TextField
                        className="item-wrapper"
                        id="outlined-basic"
                        label="New admin address"
                        variant="filled"
                        value={newAdmin}
                        onChange={(event) => {
                            setNewAdmin(event.target.value);
                        }}
                    />
                </div>

                <Button
                    variant="contained"
                    color="success"
                    onClick={clickGrantAdmin}
                >
                    Grant admine role
                    <AutoFixHighIcon style={styleIconsProps} />
                </Button>
                <Divider
                    variant="middle"
                    style={{
                        width: "90%",
                        borderBottomWidth: 1,
                        background: colorGreenLight,
                        margin: "18px 0 6px 0",
                    }}
                />

                <Typography variant="h3">Current admins: </Typography>
                <div className="select-text-wrapper">
                    <div className="item-wrapper-left">
                        <FormControl variant="filled">
                            <InputLabel id="select-tokenA-to-addLiq-label">
                                Admin
                            </InputLabel>
                            <Select
                                value={selectedAdmin || ""}
                                labelId="select-tokenA-to-addLiq-label"
                                id="select-token-to-mint"
                                onChange={(event) => {
                                    setSelectedAdmin(
                                        event.target.value as string
                                    );
                                }}
                            >
                                {admins.map((adm) => (
                                    //@ts-ignore - necessary to load object into value
                                    <MenuItem value={adm} key={adm}>
                                        {adm}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Button
                    variant="contained"
                    color="success"
                    onClick={clickRevokeAdmin}
                >
                    Revoke admin role
                    <DoDisturbIcon style={styleIconsProps} />
                </Button>
            </CardContent>
        </Card>
    );
};
