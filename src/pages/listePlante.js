import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col, Spinner, Image } from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UpdateIcon from "@material-ui/icons/Update";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import {Link} from 'react-router-dom'
import SpaIcon from '@material-ui/icons/Spa';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 400,
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ListePlante() {
  const classes = useStyles();

  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/plante/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.plante);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={10}>
          <ErrorModel error={error} />
          <SuccessModel success={success} />
          <div style={{ marginBottom: "20px" }}>
            <Link to="/ajout-plante">
            <Tooltip title="Ajout plante" aria-label="add">
              <Fab color="primary" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Tooltip>
            </Link>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell align="right">Nom</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list ? (
                  list.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        <Image
                          src={`http://localhost:5000/${row.image}`}
                          rounded
                          style={{ width: "130px", height: "150px" }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.nom}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">
                        <DeleteForeverIcon fontSize="large"
                          color="secondary"
                          onClick={async (event) => {
                            try {
                              let response = await fetch(
                                `http://localhost:5000/api/plante/${row._id}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                }
                              );
                              let responsedata = await response.json();
                              if (!response.ok) {
                                throw new Error(responsedata.message);
                              }
                              setList(list.filter((el) => el._id !== row._id));
                              setsuccess("Plante bien suprimer");
                            } catch (err) {
                              console.log(err);
                              seterror(err.message || "il y a un probleme");
                            }
                          }}
                        />{" "}
                        <Link to={`update-plante/${row._id}`}><UpdateIcon style={{ color: "green" }} fontSize="large" /></Link>
                        <Link to={`liste-maladie/${row._id}`}><SpaIcon style={{ color: "green" }} fontSize="large"/></Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <Spinner animation="grow" variant="primary" />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
