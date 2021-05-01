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

export default function Packages () {
    const classes = useStyles();

    const dispatch = useDispatch()
    dispatch(getPackages())
    
    const state = useSelector(state => state)
    // de state tomar packages
    console.log(state)

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
                    {state.map(pack => (
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