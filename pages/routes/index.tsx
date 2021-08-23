import Typography from "@material-ui/core/Typography";
import React from "react";
import {Container, FormHelperText, Grid} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from 'react';
import { getRoutes } from '../../redux/actions/route';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from "@material-ui/core/Link";

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
        },
        element: {
            ...theme.typography.button,
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(1),
          },
    }),
);

export const getStaticProps = async () => {

    const res = await fetch("https://api.apps.3.93.103.212.nip.io/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: `{
            getRoutes{
              starting_time
              p_longitudes
              p_latitudes
              driver_long
              driver_lat
            }
          }`})
      })

    const obj = await res.json();
    const data = obj.data.getRoutes;

    let index = 1;
    data.forEach(element => {
       element.id = index;
       index = index+ 1  ;
    });


    return {
        props: {data}
    }
}

export default function Packages ({data}) {

    const dispatch = useDispatch()
    const state = useSelector((state:{route:any}) => state)

    useEffect(() => {
    dispatch(getRoutes(data));
    }, [data]);

    const classes = useStyles();

    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: '100vh' }}
        className={classes.root}
        >
            <Typography component='h3' className="title" variant='h5'>
                Rutas registradas
            </Typography>

            <div>
            <List>
                {state.route.map(route => (
                    <Link href={'/routes/' + route.id} key={route.id} >
                    <ListItem>
                        <ListItemText className={classes.heading} primary={'Ruta ' + route.id}/>
                    </ListItem>
                    </Link>
                    
                ))}
            </List>
            </div>
        </Grid>
    )
}