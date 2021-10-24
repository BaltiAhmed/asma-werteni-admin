import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import {useParams} from 'react-router-dom'

const AjoutMaladie = () => {
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [nom, setNom] = useState(null);
  const [description, setDescription] = useState(null);
  const [cause, setCause] = useState(null);
  const [prevension, setPrevension] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "cause") {
      setCause(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    } else {
      setPrevension(e.target.value);
    }
  };

  const id = useParams().id;

  const submit = async (e) => {
    e.preventDefault();

    console.log(nom)
    console.log(cause)
    console.log(prevension)
    console.log(description)

    try {
      let response = await fetch("http://localhost:5000/api/maladie/ajoutmaladie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          description: description,
          cause: cause,
          prevension: prevension,
          planteId: id
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess("Maladie ajoutée.")
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nom"
                  name="nom"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridName">
                <Form.Label>Cause</Form.Label>
                <Form.Control
                  as="select"
                  name="cause"
                  onChange={onchange}
                  required
                >
                  <option></option>
                  <option> الفطر يوستيلاجو نودا</option>
                  
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridName">
                <Form.Label>Prevension</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="prevension"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridName">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Enregistrer
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};
export default AjoutMaladie;
