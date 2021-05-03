import Typography from "@material-ui/core/Typography";
import React from "react";
import {Container, Dialog, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSelector, useDispatch} from "react-redux";
import { getTrucks } from '../../redux/actions/trucks';
import {ApolloClient, gql, InMemoryCache, useMutation} from "@apollo/client";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircle from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme: Theme) => ({
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
    addTruck: {
        ...theme.typography.button,
        padding: theme.spacing(2),
    },
}));

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

const ADD_TRUCK = gql `
    mutation CreateTruck($registration: String, $status: String, $weight_capacity: Float, $volume_capacity: Float, $fuel_type: String, $fuel_capacity: Float, $fuel_by_kilometer: Float, $fuel: Float, $warehouse: Int) {
        createTruck (truck: {
            registration: $registration
            status: $status
            weight_capacity: $weight_capacity
            volume_capacity: $volume_capacity
            fuel_type: $fuel_type
            fuel_capacity: $fuel_capacity
            fuel_by_kilometer: $fuel_by_kilometer
            fuel: $fuel
            warehouse: $warehouse
        }) {
            id
            registration
            status
            weight_capacity
            volume_capacity
            fuel_type
            fuel_capacity
            fuel_by_kilometer
            fuel
            warehouse
        }
    }
`;

export const getStaticProps = async () => {
    const {data} = await client.query({
        query: gql `
        query {
            getTrucks {
                id
                registration
                status
                weight_capacity
                volume_capacity
                fuel_type
                fuel_capacity
                fuel_by_kilometer
                fuel
                warehouse
            }
        }
        `
    });

    return {
        props: {res: data.getTrucks}
    }
}

export default function Packages ({res}) {
    const classes = useStyles();

    const m3 = '\u00B3';

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [addTruck] = useMutation(ADD_TRUCK, {
        client: client,
    })

    const newTruck = async event => {
        event.preventDefault()

        const res = await addTruck({
            variables: {
                registration: event.target.registration.value,
                status: event.target.status.value,
                weight_capacity: parseFloat(event.target.weight_capacity.value),
                volume_capacity: parseFloat(event.target.volume_capacity.value),
                fuel_type: event.target.fuel_type.value,
                fuel_capacity: parseFloat(event.target.fuel_capacity.value),
                fuel_by_kilometer: parseFloat(event.target.fuel_by_kilometer.value),
                fuel: parseFloat(event.target.fuel.value),
                warehouse: parseInt(event.target.warehouse.value)
            }
        });
    }

    return (
        <Container>
            <Typography component='h3' className="title" variant='h5'>
                Camiones registrados
            </Typography>
            <div className={classes.root}>
                <Accordion key="addTruck">
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
                                <Typography className={classes.addTruck} style={{fontWeight: 800, flexGrow: 14}}>Añadir camión </Typography>
                                <Button variant="contained" color="primary" onClick={handleClickOpen} style={{flexGrow: 1}}>
                                    <AddCircle/>
                                </Button>
                            </Grid>
                        </Box>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Añadir camión</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Datos del nuevo camión
                                </DialogContentText>
                                <form className={classes.form} noValidate onSubmit={ newTruck }>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="registration"
                                        label="Registro"
                                        name="registration"
                                        autoComplete="registration"
                                        autoFocus
                                        type="text"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="status"
                                        label="Estado"
                                        id="status"
                                        autoComplete="status"
                                        type="text"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="weight_capacity"
                                        label="Capacidad de peso"
                                        id="weight_capacity"
                                        autoComplete="weight_capacity"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="volume_capacity"
                                        label="Capacidad de volumen"
                                        id="volume_capacity"
                                        autoComplete="volume_capacity"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="fuel_type"
                                        label="Tipo de combustrible"
                                        id="fuel_type"
                                        autoComplete="fuel_type"
                                        type="text"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="fuel_capacity"
                                        label="Capacidad de combustible"
                                        id="fuel_capacity"
                                        autoComplete="fuel_capacity"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="fuel_by_kilometer"
                                        label="Gasto de combustible por Km"
                                        id="fuel_by_kilometer"
                                        autoComplete="fuel_by_kilometer"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="fuel"
                                        label="Nivel de combustible"
                                        id="fuel"
                                        autoComplete="fuel"
                                        type="number"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="warehouse"
                                        label="Centro de distribución"
                                        id="warehouse"
                                        autoComplete="warehouse"
                                        type="number"
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
                {res.map(truck => (
                    <Accordion key={truck.id}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={truck.id}
                    id={truck.id}
                    >
                    <div>
                        <Typography className={classes.secondaryHeading}>{truck.status}</Typography>
                        <Typography className={classes.heading}>Camión {truck.registration}</Typography>
                    </div>
                    </AccordionSummary>
                        <AccordionDetails>
                        <div>
                          <Typography> Capacidad de carga: {truck.weight_capacity} Kg </Typography>
                          <Typography> Capacidad de volumen: {truck.volume_capacity} m{m3} </Typography>
                          <Typography> Combustible disponible: {truck.fuel_capacity} % </Typography>
                          <Typography> Tipo de combustible: {truck.fuel_type} </Typography>
                          <Typography> Centro de distribución: {truck.warehouse} </Typography>
                        </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </Container>
    )
}