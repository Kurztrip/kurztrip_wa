import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useState} from "react"
import {editUser} from "../redux/actions/user"
import {useSelector, useDispatch} from "react-redux"
import { ApolloClient,InMemoryCache,ApolloProvider,useQuery,useMutation,gql } from '@apollo/client';
import {connect} from "react-redux"



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!){
        Login(login: {
            email: $email, password: $password
        }
        ){
            access_token
        }
    }
`;


const SignIn = ({editUser}) => {
    
    const classes = useStyles();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [
        login,
        { loading: mutationLoading, error: mutationError }
      ] = useMutation(LOGIN_USER);


    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log({email, password})
        const res = login({ variables: { "email":email, "password":password } });
        res.then(function(data){
            console.log(data.data.Login.access_token)
            editUser(data.data.Login.access_token)
        }).catch(function(reason){
            console.log ("error")
        })
        console.log (res.catch)
        dispatch(editUser({password, email}))
    }
   
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e=> setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e=> setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

const mapDispatchToProps = {
    editUser,
}
export default connect(null, mapDispatchToProps)(SignIn)