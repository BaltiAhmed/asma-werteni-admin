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
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { Link, useParams } from "react-router-dom";
import SpaIcon from "@material-ui/icons/Spa";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
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

export default function ListeAgriculteur() {
  const classes = useStyles();

  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const id = useParams().id;

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/agriculteur/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.agriculteurs);
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

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Nom</TableCell>
                  <TableCell align="right">Prenom</TableCell>
                  <TableCell align="right">Date de naissance</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Téléphone</TableCell>
                  <TableCell align="right">Adresse</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list ? (
                  list.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell align="right">{row.nom}</TableCell>
                      <TableCell align="right">{row.prenom}</TableCell>
                      <TableCell align="right">{row.datenaissa}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.telephone}</TableCell>
                      <TableCell align="right">{row.adresse}</TableCell>
                      <TableCell align="right">
                        <Link to={``}>
                          <FormatListBulletedIcon style={{ color: "blue" }} />
                        </Link>
                        <DeleteForeverIcon
                          color="secondary"
                          onClick={async (event) => {
                            try {
                              let response = await fetch(
                                `http://localhost:5000/api/agriculteur/${row._id}`,
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
                              setsuccess("Agriculteur bien suprimer");
                            } catch (err) {
                              console.log(err);
                              seterror(err.message || "il y a un probleme");
                            }
                          }}
                        />{" "}
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
