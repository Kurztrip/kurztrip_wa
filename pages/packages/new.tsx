import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}));

export default function Form() {
    const classes = useStyles();

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

    // return (
    //     <form onSubmit={ newPackage }>
    //         <div>
    //             <label htmlFor="address">Address</label>
    //             <input id="address" name="address" type="text" autoComplete="name" required />
    //         </div>
    //         <div>
    //             <label htmlFor="weight">Weight</label>
    //             <input id="weight" type="number" required />
    //         </div>
    //         <div>
    //             <label htmlFor="volume">Volume</label>
    //             <input id="volume" type="number" required/>
    //         </div>
    //         <button type="submit">Add package</button>
    //     </form>
    // )

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create package
                    </Button>
                </form>
            </div>
        </Container>
    );
}