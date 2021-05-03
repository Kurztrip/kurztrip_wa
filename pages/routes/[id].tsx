import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(3),
            flexGrow: 1,

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

const defaultCenter = { lat: 40.748817, lng: -73.985428 };

const defaultOptions = { scrollwheel: false };

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={ defaultCenter }
      defaultOptions={ defaultOptions }
    >
      <Marker position={ defaultCenter } />
    </GoogleMap>
  ))
);

const loadingElementStyle = { height: '100%' };
const containerElementStyle = { height: '40vw' };
const mapElementStyle = { height: '100%' };

export default function GoogleMaps(){
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <RegularMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAFCcyGgadxT2LaaQjcTRl0cGhPQSY9lBk"
      loadingElement={<div style={ loadingElementStyle } />}
      containerElement={<div style={ containerElementStyle } />}
      mapElement={<div style={ mapElementStyle } />}
    />

    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    ></Grid>
    </div>
  );
}