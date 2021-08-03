import Typography from "@material-ui/core/Typography";
import React from "react";
import {Container, Dialog, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import AddCircle from '@material-ui/icons/AddCircle';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {ApolloClient, gql, InMemoryCache, useMutation} from '@apollo/client';
import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from 'react';
import { getPackages, createPackage, removePackage, updatePackage } from "../../redux/actions/package";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(12),
        color: theme.palette.text.secondary,
    },
    title: {
        border: 10,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: '#6200EE',
    },
    addBar: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    grid: {
        height: "100%"
    },
    addPackage: {
        ...theme.typography.button,
        padding: theme.spacing(4),
    },
}));

const client = new ApolloClient({
    uri: 'http://54.242.133.42/',
    cache: new InMemoryCache()
});

const ADD_PACKAGE = gql `
    mutation CreatePackage($address: String, $weight: Float, $volume: Float, $latitude: Float, $longitude: Float, $storeId: Int, $receiver: String, $idReceiver: String) {
        createPackage (new_package: {
            address: $address
            weight: $weight
            volume: $volume
            latitude: $latitude
            longitude: $longitude
            storeId: $storeId
            receiver: $receiver
            idReceiver: $idReceiver
        }) {
            id
            address
            weight
            volume
            latitude
            longitude
            storeId
            receiver
            idReceiver
        }
    }
`;

const EDIT_PACKAGE = gql `
    mutation UpdatePackage($id: Int!, $address: String, $weight: Float, $volume: Float, $latitude: Float, $longitude: Float, $storeId: Int, $receiver: String, $idReceiver: String) {
        updatePackage (id:$id, update_package: {
            address: $address
            weight: $weight
            volume: $volume
            latitude: $latitude
            longitude: $longitude
            storeId: $storeId
            receiver: $receiver
            idReceiver: $idReceiver
        }) {
            id
            address
            weight
            volume
            latitude
            longitude
            storeId
            receiver
            idReceiver
        }
    }
`;

const DELETE_PACKAGE = gql `
    mutation DeletePackage($id: Int!) {
        deletePackage (id: $id)
    }
`;

export const getStaticProps = async () => {
    const {data} = await client.query({
        query: gql `
        query {
            getPackages{
                id
                address
                weight
                volume
                latitude
                longitude
                storeId
                receiver
                idReceiver
            }
        }
        `
    });

    return {
        props: {res: data.getPackages}
    }
}

export default function packs ({res}) {
    const classes = useStyles();

    const dispatch = useDispatch()
    const state = useSelector(state => state)

    useEffect(() => {
        dispatch(getPackages(res));
    }, [res]);

    const m3 = '\u00B3';

    const [openAdd, setOpenAdd] = React.useState(false);

    const [openEdit, setOpenEdit] = React.useState(false);

    const [formInfo, setformInfo] = React.useState({
        id: 0,
        address: 'a',
        weight: 0,
        volume: 0,
        latitude: 0,
        longitude: 0,
        storeId: 0,
        receiver: 'a',
        idReceiver: 'a',
    });

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    const handleClickOpenEdit = async (event,pack) => {
        event.stopPropagation();

        setformInfo(pack);

        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const [addPackage] = useMutation(ADD_PACKAGE, {
        client: client,
    })

    const [updatePackage] = useMutation(EDIT_PACKAGE, {
        client: client,
    })

    const [removePackage] = useMutation(DELETE_PACKAGE, {
        client: client,
    })

    const newPackage = async event => {
        event.preventDefault()

        const address= event.target.address.value;
        const weight= parseFloat(event.target.weight.value);
        const volume= parseFloat(event.target.volume.value);
        const latitude= parseFloat(event.target.latitude.value);
        const longitude= parseFloat(event.target.longitude.value);
        const storeId= parseInt(event.target.storeId.value);
        const receiver= event.target.receiver.value;
        const idReceiver= event.target.idReceiver.value; 

        const res = await addPackage({
            variables: {
                address: event.target.address.value,
                weight: parseFloat(event.target.weight.value),
                volume: parseFloat(event.target.volume.value),
                latitude: parseFloat(event.target.latitude.value),
                longitude: parseFloat(event.target.longitude.value),
                storeId: parseInt(event.target.storeId.value),
                receiver: event.target.receiver.value,
                idReceiver: event.target.idReceiver.value
            }
        });

        dispatch(createPackage({
            address: address,
            weight: weight,
            volume: volume,
            latitude: latitude,
            longitude: longitude,
            storeId: storeId,
            receiver: receiver,
            idReceiver: idReceiver
        }));
    }

    const editPackage = async (event,id) => {
        event.preventDefault()

        const res = await updatePackage({
            variables: {
                id: id,
                address: event.target.address.value,
                weight: parseFloat(event.target.weight.value),
                volume: parseFloat(event.target.volume.value),
                latitude: parseFloat(event.target.latitude.value),
                longitude: parseFloat(event.target.longitude.value),
                storeId: parseInt(event.target.storeId.value),
                receiver: event.target.receiver.value,
                idReceiver: event.target.idReceiver.value
            }
        });
    }

    const deletePackage = async (event, id) => {
        event.stopPropagation()

        const res = await removePackage({
            variables: {
                id: parseInt(id)
            }
        });
    }

    return (
        <Container>
            <Typography component='h3' className="title" variant='h5'>
                Paquetes registrados
            </Typography>
            <div className={classes.root}>
                <Accordion key="addPackage">
                    <div>
                        <Box height='10.5vh' mr={6}>
                            <Grid
                                className={classes.grid}
                                container
                                direction='row'
                                justify="flex-end"
                                alignItems="center"
                                spacing={2}
                            >
                                <Typography className={classes.addPackage} style={{fontWeight: 800, flexGrow: 10}}>Añadir paquete </Typography>
                                <Button onClick={handleClickOpenAdd} style={{flexGrow: 1}}>
                                    <AddCircle/>
                                </Button>
                            </Grid>
                        </Box>
                        <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="add">
                            <DialogTitle id="addPackage">Añadir paquete</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Datos del nuevo paquete
                                </DialogContentText>
                                <form className={classes.form} noValidate onSubmit={ newPackage }>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Dirección"
                                        name="address"
                                        autoComplete="address"
                                        autoFocus
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="weight"
                                        label="Peso"
                                        id="weight"
                                        autoComplete="weight"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="volume"
                                        label="Volumen"
                                        id="volume"
                                        autoComplete="volume"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="latitude"
                                        label="Latitúd"
                                        id="latitude"
                                        autoComplete="latitude"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="longitude"
                                        label="Longitúd"
                                        id="longitude"
                                        autoComplete="longitude"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="storeId"
                                        label="Centro de distribución"
                                        id="storeId"
                                        autoComplete="storeId"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="receiver"
                                        label="Destinatario"
                                        id="receiver"
                                        autoComplete="receiver"
                                        type="text"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="idReceiver"
                                        label="ID Destinatario"
                                        id="idReceiver"
                                        autoComplete="idReceiver"
                                        type="text"
                                    />
                                    <div className={classes.buttons}>
                                        <Button onClick={handleCloseAdd} color="primary">
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleCloseAdd}
                                        >
                                            Guardar
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Accordion>
            </div>
            <div className={classes.root}>
                {state.packages.map(pack => (
                    <div key={pack.id}>
                        <Accordion key={pack.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={pack.id}
                                id={pack.id}
                            >
                                <Container>
                                    <Box height='6vh'>
                                        <Grid
                                            className={classes.grid}
                                            container
                                            direction='row'
                                            justify="flex-end"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <div style={{flexGrow: 19}}>
                                                <Typography className={classes.secondaryHeading}>En curso</Typography>
                                                <Typography className={classes.heading}>Paquete #{pack.id}</Typography>
                                            </div>
                                            <Button onClick={ e => handleClickOpenEdit(e, pack) } style={{flexGrow: 1}}>
                                                <EditIcon/>
                                            </Button>
                                            <Button onClick={ e => deletePackage(e, pack.id) } style={{flexGrow: 1}}>
                                                <DeleteIcon/>
                                            </Button>
                                        </Grid>
                                    </Box>
                                </Container>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                    <Typography> Dirección: {pack.address} </Typography>
                                    <Typography> Peso: {pack.weight} Kg </Typography>
                                    <Typography> Volumen: {pack.volume} m{m3} </Typography>
                                    <Typography> Coordenadas de destino: [ {pack.latitude} , {pack.longitude} ] </Typography>
                                    <Typography> Centro de distribución: {pack.storeId} </Typography>
                                    <Typography> Destinatario: {pack.receiver}</Typography>
                                    <Typography> ID Destinatario: {pack.idReceiver}</Typography>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ))}
            </div>
            <div>
                <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby={"edit"} key={"dialog"}>
                    <DialogTitle id={"editPackage"}>Editar paquete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Datos del paquete #{formInfo.id}
                        </DialogContentText>
                        <form className={classes.form} noValidate onSubmit={ e => editPackage(e,formInfo.id) }>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                label="Dirección"
                                name="address"
                                autoComplete="address"
                                autoFocus
                                type="text"
                                defaultValue={formInfo.address}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="weight"
                                label="Peso"
                                id="weight"
                                autoComplete="weight"
                                type="number"
                                defaultValue={formInfo.weight}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="volume"
                                label="Volumen"
                                id="volume"
                                autoComplete="volume"
                                type="number"
                                defaultValue={formInfo.volume}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="latitude"
                                label="Latitúd"
                                id="latitude"
                                autoComplete="latitude"
                                type="number"
                                defaultValue={formInfo.latitude}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="longitude"
                                label="Longitúd"
                                id="longitude"
                                autoComplete="longitude"
                                type="number"
                                defaultValue={formInfo.longitude}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="storeId"
                                label="Centro de distribución"
                                id="storeId"
                                autoComplete="storeId"
                                type="number"
                                defaultValue={formInfo.storeId}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="receiver"
                                label="Destinatario"
                                id="receiver"
                                autoComplete="receiver"
                                type="text"
                                defaultValue={formInfo.receiver}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="idReceiver"
                                label="ID Destinatario"
                                id="idReceiver"
                                autoComplete="idReceiver"
                                type="text"
                                defaultValue={formInfo.idReceiver}
                            />
                            <div className={classes.buttons}>
                                <Button onClick={handleCloseEdit} color="primary">
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleCloseEdit}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </Container>
    )
}