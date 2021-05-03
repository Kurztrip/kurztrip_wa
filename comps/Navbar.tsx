import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        appBar: {
            background: '#6200EE',
        },
    }),
);

const Navbar = () => {
    const classes = useStyles();

    return (
        <div style={{flexGrow: 1}}>
            <AppBar position="static" className={classes.appBar} >
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Kurztrip
                    </Typography>
                    <Button color="inherit" href="/packages">Paquetes</Button>
                    <Button color="inherit" href="/trucks">Camiones</Button>
                    <Button color="inherit" href="/routes">Rutas</Button>
                    <Button color="inherit" href="/login">Iniciar sesión</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;