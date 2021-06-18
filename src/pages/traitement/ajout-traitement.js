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
import axios from "axios";
import {useParams} from 'react-router-dom'

const AjoutTraitement = () => {
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

  const [prix, setPrix] = useState();
  const [description, setDescription] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "prix") {
      setPrix(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  const id = useParams().id

  const ajout = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("image", File);
      formData.append("prix", prix);
      formData.append("description", description);
      formData.append("maladieId", id);

      await axios.post(
        `http://localhost:5000/api/traitement/ajouttraitement`,
        formData
      );

      setsuccess("Plante bien ajouter");
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
            <Form onSubmit={ajout}>
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
                      style={{ width: "50%", height: "50%" }}
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
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Prix"
                  name="prix"
                  required
                  onChange={onchange}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description </Form.Label>
                <Form.Control
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
export default AjoutTraitement;
