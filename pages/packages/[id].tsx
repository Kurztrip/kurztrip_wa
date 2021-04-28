import Typography from "@material-ui/core/Typography";
import React from "react";
import {Container, Table, TableBody, TableCell, TableRow} from "@material-ui/core";

export const getStaticPaths = async () => {
    const res = await fetch('http://localhost:8080/packages');
    const data = await res.json();

    const paths = data.map(pack => {
        return {
            params: {id: pack.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await fetch('http://localhost:8080/packages/' + id);
    const data = await res.json();

    return {
        props: { pack: data }
    }
}

const PackageDetails = ({ pack }) => {
    return (
        <Container>
            <Typography component="h1" variant="h5">
                Package details
            </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>{pack.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>{pack.address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Weight</TableCell>
                        <TableCell>{pack.weight}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Volume</TableCell>
                        <TableCell>{pack.volume}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Container>
    )
}

export default PackageDetails;