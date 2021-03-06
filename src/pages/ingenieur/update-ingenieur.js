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
import { useParams } from "react-router-dom";

const UpdateIngenieur = () => {
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/ingenieur/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setNom(responseData.ingenieur.nom);
        setPrenom(responseData.ingenieur.prenom);
        setEmail(responseData.ingenieur.email);
        setTel(responseData.ingenieur.telephone);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [nom, setNom] = useState(null);
  const [prenom, setPrenom] = useState(null);
  const [email, setEmail] = useState(null);
  const [tel, setTel] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "prenom") {
      setPrenom(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setTel(e.target.value);
    }
  };

  const id = useParams().id;

  const submit = async (e) => {
    e.preventDefault();

    console.log(nom);

    try {
      let response = await fetch(`http://localhost:5000/api/ingenieur/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          email: email,
          telephone: tel,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess("Ing??nieur modifi??e.");
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
                  value={nom}
                  type="text"
                  placeholder="tapez le nom"
                  name="nom"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Prenom</Form.Label>
                <Form.Control
                  value={prenom}
                  type="text"
                  placeholder="tapez le prenom"
                  name="prenom"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  type="email"
                  placeholder="tapez le nom"
                  name="email"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  value={tel}
                  type="number"
                  maxLength={8}
                  placeholder="tapez le num??ro de t??l??phone"
                  name="tel"
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
export default UpdateIngenieur;
