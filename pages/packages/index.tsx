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
import {ApolloClient, gql, InMemoryCache, useMutation} from '@apollo/client';

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
        padding: theme.spacing(2),
    },
}));

const client = new ApolloClient({
    uri: 'http://localhost:4000',
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

    const m3 = '\u00B3';

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [addPackage] = useMutation(ADD_PACKAGE, {
        client: client,
    })

    const newPackage = async event => {
        event.preventDefault()

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
    }

    return (
        <Container>
            <Typography component='h3' className="title" variant='h5'>
                Paquetes registrados
            </Typography>
            <div className={classes.root}>
                <Accordion key="addPackage">
                    <div>
                        <Box height='10vh' mr={4}>
                            <Grid
                                className={classes.grid}
                                container
                                direction='row'
                                justify="flex-end"
                                alignItems="center"
                                spacing={2}
                            >
                                <Typography className={classes.addPackage} style={{fontWeight: 800, flexGrow: 14}}>Añadir paquete </Typography>
                                <Button variant="contained" color="primary" onClick={handleClickOpen} style={{flexGrow: 1}}>
                                    <AddCircle/>
                                </Button>
                            </Grid>
                        </Box>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Añadir paquete</DialogTitle>
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
                                        <Button onClick={handleClose} color="primary">
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleClose}
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
                {res.map(pack => (
                    <Accordion key={pack.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={pack.id}
                            id={pack.id}
                        >
                            <div>
                                <Typography className={classes.secondaryHeading}>En curso</Typography>
                                <Typography className={classes.heading}>Paquete #{pack.id}</Typography>
                            </div>
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
                ))}
            </div>
        </Container>
    )
}