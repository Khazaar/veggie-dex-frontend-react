import { useContext, useEffect, useState } from "react";
import { SmartContractServiceContext } from "../../App";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";

import "./style.css";
import "../../assets/styles/styles.css";

import {
    styleBox,
    styleCircularProgress,
    styleIconsProps,
} from "../../assets/styles/stypeProps";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { colorGreenLight } from "../../assets/styles/theme";
import { useAdminRolesSubscription } from "../../hooks";
import { Subscription } from "rxjs";
import { IRoleChanged } from "../../interfaces/IRoleChanged";

export const OwnerPanelComponent = () => {
    const smartContractService = useContext(SmartContractServiceContext);
    const [admins, setAdmins] = useState<string[]>([]);
    const [selectedAdmin, setSelectedAdmin] = useState<string>("");
    const [newAdmin, setNewAdmin] = useState<string>("");
    const [isRevokeLoading, setIsRevokeLoading] = useState<boolean>(false);
    const [isGrantLoading, setIsGrantLoading] = useState<boolean>(false);
    const [warningSnackOpen, setWarningSnackOpen] = useState<boolean>(false);
    const [warningSnackMessage, setWarningSnackMessage] = useState<string>("");
    const [successSnackOpen, setSuccessSnackOpen] = useState<boolean>(false);
    const [successSnackMessage, setSuccessSnackMessage] = useState<string>("");

    const clickRevokeAdmin = async () => {
        console.log(`Going to revoke admin role from ${selectedAdmin}`);
        try {
            setIsRevokeLoading(true);
            await smartContractService.revokeAdminRole(selectedAdmin);
        } catch (e) {
            setIsRevokeLoading(false);
            console.error(e);
            setWarningSnackOpen(true);
            setWarningSnackMessage((e as any).message);
        }
    };

    const clickGrantAdmin = async () => {
        console.log(`Going to grant admin role to ${newAdmin}`);
        try {
            setIsGrantLoading(true);
            await smartContractService.grantAdminRole(newAdmin);
        } catch (e) {
            setIsGrantLoading(false);
            console.error(e);
            setWarningSnackOpen(true);
            setWarningSnackMessage((e as any).message);
        }
    };

    const fetchData = async () => {
        smartContractService.getRouterAdmins().then((admns) => {
            setAdmins(admns);
            if (admns.length > 0) {
                setSelectedAdmin(admns[0]);
            }
        });
    };

    useEffect(() => {
        smartContractService.initSmartContractService().then(() => {
            fetchData();
        });
    }, []);

    useEffect(() => {
        const subscriptions: Subscription[] = [];
        subscriptions.push(
            smartContractService.blockchainSubscriptions
                .RoleGranted$()
                .subscribe(async (roleChanged: IRoleChanged) => {
                    setIsGrantLoading(false);
                    setSuccessSnackOpen(true);
                    const msg = `Admin role granted to ${roleChanged.account}`;
                    setSuccessSnackMessage(msg);
                    console.log(msg);
                    setNewAdmin("");
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );
        subscriptions.push(
            smartContractService.blockchainSubscriptions
                .RoleRevoked$()
                .subscribe(async (roleRevoked: IRoleChanged) => {
                    setIsRevokeLoading(false);
                    setSuccessSnackOpen(true);
                    const msg = `Admin role revoked from ${roleRevoked.account}`;
                    setSuccessSnackMessage(msg);
                    console.log(msg);
                    fetchData()
                        .then(() => {})
                        .catch((error) => {
                            console.log(error);
                        });
                })
        );

        return () => {
            subscriptions.forEach((subscription) => {
                subscription.unsubscribe();
            });
        };
    }, []);

    return (
        <div>
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
                        <Box sx={styleBox}>
                            <AutoFixHighIcon style={styleIconsProps} />
                            {isGrantLoading && (
                                <CircularProgress
                                    size={30}
                                    sx={styleCircularProgress}
                                />
                            )}
                        </Box>
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
                                {admins.length > 0 && (
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
                                )}
                            </FormControl>
                        </div>
                    </div>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={clickRevokeAdmin}
                    >
                        Revoke admin role
                        <Box sx={styleBox}>
                            <DoDisturbIcon style={styleIconsProps} />
                            {isRevokeLoading && (
                                <CircularProgress
                                    size={30}
                                    sx={styleCircularProgress}
                                />
                            )}
                        </Box>
                    </Button>
                </CardContent>
            </Card>
            <Snackbar
                open={warningSnackOpen}
                autoHideDuration={4000}
                onClose={() => {
                    setWarningSnackOpen(false);
                }}
            >
                <Alert
                    onClose={() => {
                        setWarningSnackOpen(false);
                    }}
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    {warningSnackMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={successSnackOpen}
                autoHideDuration={4000}
                onClose={() => {
                    setSuccessSnackOpen(false);
                }}
            >
                <Alert
                    onClose={() => {
                        setSuccessSnackOpen(false);
                    }}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {successSnackMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};
