import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {Table, TableBody, TableRow, TableCell, TableHead, Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from "react-redux"
import { getPackages } from '../../redux/actions/package';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

// Llamado a la acción, POR CORREGIR
//const dispatch = useDispatch()
//const state = useSelector(state => state)

export const getStaticProps = async () => {
    // ERROR EN CODIGO AQUI
    //dispatch(getPackages())
    const res = await fetch('http://localhost:8080/packages');
    const data = await res.json();

    return {
        data
        //state
    }

}

export default function Packages ({ packages }) {
    const classes = useStyles();

    return (
        <Container>
            <Typography component='h3' variant='h5'>
                All packages
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Package</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packages.map(pack => (
                        <TableRow key={pack.id}>
                            <TableCell>
                                <Link href={'/packages/'+ pack.id} key={pack.id}>{'Package ' + pack.id}</Link>
                            </TableCell>
                            <TableCell>{pack.weight}</TableCell>
                            <TableCell>{pack.volume}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}