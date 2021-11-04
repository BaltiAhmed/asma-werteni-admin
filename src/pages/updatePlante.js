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
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatePlante = () => {
  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);
  console.log(previewUrl);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
  };

  const pickImageHandler = (event) => {
    filePickerRef.current.click();
  };

  const [nom, setNom] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "type") {
      setType(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const id = useParams().id;

  const ajoutPlante = async (e) => {
    e.preventDefault();
    console.log(nom);
    console.log(type);

    try {
      const formData = new FormData();

      formData.append("image", File);
      formData.append("nom", nom);
      formData.append("type", type);
      formData.append("description", description);

      await axios.patch(`http://localhost:5000/api/plante/${id}`, formData);

      setsuccess("Plante bien modifié");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/plante/${id}`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setType(responseData.plante.type);
        setNom(responseData.plante.nom);
        setDescription(responseData.plante.description);
        setPreviewUrl("http://localhost:5000/" + responseData.plante.image);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={ajoutPlante}>
              <div
                style={{
                  width: "50%",
                  marginBottom: "30px",
                  marginTop: "20px",
                }}
              >
                <input
                  ref={filePickerRef}
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler}
                />
                <div>
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      rounded
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}

                  <Button
                    type="button"
                    variant="primary"
                    onClick={pickImageHandler}
                    style={{ marginTop: "20px" }}
                  >
                    PICK IMAGE
                  </Button>
                </div>
                {!isValid && <p></p>}
              </div>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  value={nom}
                  type="text"
                  placeholder="Nom de la plante"
                  name="nom"
                  required
                  onChange={onchange}
                />
              </Form.Group>

              <Form.Group controlId="formGridName">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  value={type}
                  type="text"
                  placeholder="Type "
                  name="type"
                  required
                  onChange={onchange}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description </Form.Label>
                <Form.Control
                  value={description}
                  as="textarea"
                  rows={5}
                  name="description"
                  required
                  onChange={onchange}
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
export default UpdatePlante;
