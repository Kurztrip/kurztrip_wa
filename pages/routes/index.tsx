import Typography from "@material-ui/core/Typography";
import React from "react";
import {Container} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSelector, useDispatch} from "react-redux";
import { getTrucks } from '../../redux/actions/trucks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            marginTop: theme.spacing(3),
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(12),
            color: theme.palette.text.secondary,
        },
        title: {
            margin: theme.spacing(10),
        }
    }),
);

export const getStaticProps = async () => {
    const res = await fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: `{ getTrucks{
            id
            registration
            status
            weight_capacity
            volume_capacity
            fuel_type
            fuel_capacity
            fuel_by_kilometer
            warehouse
            fuel
        } }`})
      })
    const obj = await res.json();
    const data = obj.data.getTrucks;

    return {
        props: {data}
    }
}

export default function Packages ({data}) {
    const classes = useStyles();

    const m3 = '\u00B3';

    const dispatch = useDispatch()
    dispatch(getTrucks())

    return (
        <Container>
            <Typography component='h3' className="title" variant='h5'>
                Camiones registrados
            </Typography>

            <div className={classes.root}>

                {data.map(truck => (
                    <Accordion key={truck.id}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={truck.id}
                    id={truck.id}
                    >
                    <div>
                        <Typography className={classes.secondaryHeading}>ID: {truck.id}. Status: {truck.status}</Typography>
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