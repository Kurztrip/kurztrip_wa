import Typography from "@material-ui/core/Typography";
import React from "react";
import {
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch} from "react-redux"
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {getPackages} from "../../redux/actions/package";
import Button from "@material-ui/core/Button";
import AddCircle from '@material-ui/icons/AddCircle';

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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: '#6200EE',
    },
    addButton: {
        align: 'right',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

export const getStaticProps = async () => {
    const res = await fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: `{ getPackages{
            id
            address
            weight
            volume
            latitude
            longitude
            storeId
            receiver
            idReceiver
        } }`})
    })
    const obj = await res.json();
    const data = obj.data.getPackages;

    return {
        props: {data}
    }
}

export default function packs ({data}) {
    const classes = useStyles();

    const m3 = '\u00B3';

    const dispatch = useDispatch()
    dispatch(getPackages())

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const newPackage = async event => {
        event.preventDefault()

        const res = await fetch(
            'http://localhost:8080/packages/add',
            {
                body: JSON.stringify({
                    address: event.target.address.value,
                    weight: event.target.weight.value,
                    volume: event.target.volume.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json()
    }

    return (
        <Container>
            <Typography component='h3' className="title" variant='h5'>
                Camiones registrados
            </Typography>
            <div className={classes.root}>
                <Accordion key="addPackage">
                    <div>
                        <div>
                            <Typography className={classes.heading}>Añadir Paquete </Typography>
                            <Button color="primary" onClick={handleClickOpen}>
                                <AddCircle/>
                            </Button>
                        </div>
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
                                        label="Address"
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
                                        label="Weight"
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
                                        label="Volume"
                                        id="volume"
                                        autoComplete="volume"
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
                {data.map(pack => (
                    <Accordion key={pack.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={pack.id}
                            id={pack.id}
                        >
                            <div>
                                <Typography className={classes.secondaryHeading}>ID: {pack.id}</Typography>
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