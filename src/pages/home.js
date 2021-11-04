import { Container, Row, Col, Card, Image } from "react-bootstrap";
import ingénieur from "../images/ingénieur.png";
import agriculteur from "../images/agriculteur.png";
import plante from "../images/plante.png";
import maladie from "../images/maladie.png";
import symtome from "../images/symtome.png";
import questionnaire from "../images/questionnaire.png";
import reclamation from "../images/reclamation.png";
import statistique from "../images/statistique.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Link
              to="/liste-ingenieur"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card border="success" style={{ width: "16rem" }}>
                <Card.Header>Gestion Des Ingénieurs</Card.Header>
                <Card.Body>
                  <Col xs={50} md={5}>
                    <Image
                      src={ingénieur}
                      style={{ width: "10rem", height: "9rem" }}
                      rounded
                    />
                  </Col>
                </Card.Body>
              </Card>
            </Link>{" "}
          </Col>
          <Col>
            <Link
              to="liste-agriculteur"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card border="primary" style={{ width: "16rem" }}>
                <Card.Header>Gestion Des Agriculteurs</Card.Header>
                <Card.Body>
                  <Col xs={50} md={5}>
                    <Image
                      src={agriculteur}
                      style={{ width: "10rem", height: "9rem" }}
                      rounded
                    />
                  </Col>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link
              to="/plante"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card
                border="warning"
                style={{ width: "16rem", textDecoration: "none" }}
              >
                <Card.Header>Gestion Des Plantes</Card.Header>
                <Card.Body>
                  <Col xs={50} md={5}>
                    <Image
                      src={plante}
                      style={{ width: "10rem", height: "9rem" }}
                      rounded
                    />
                  </Col>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <Card border="success" style={{ width: "16rem", marginTop: "8%" }}>
              <Card.Header>Gestion Des Maladies</Card.Header>
              <Card.Body>
                <Col xs={50} md={5}>
                  <Image
                    src={maladie}
                    style={{ width: "10rem", height: "9rem" }}
                    rounded
                  />
                </Col>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="primary" style={{ width: "16rem", marginTop: "8%" }}>
              <Card.Header>Gestion Des Symptomes</Card.Header>
              <Card.Body>
                <Col xs={50} md={5}>
                  <Image
                    src={symtome}
                    style={{ width: "10rem", height: "9rem" }}
                    rounded
                  />
                </Col>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card border="warning" style={{ width: "16rem", marginTop: "8%" }}>
              <Card.Header>Gestion Des Questionnaires</Card.Header>
              <Card.Body>
                <Col xs={50} md={5}>
                  <Image
                    src={questionnaire}
                    style={{ width: "10rem", height: "9rem" }}
                    rounded
                  />
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <Link
              to="/reclamation"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card
                border="success"
                style={{ width: "16rem", marginTop: "5%", marginLeft: "30%" }}
              >
                <Card.Header>Gestion Des Réclamations</Card.Header>
                <Card.Body>
                  <Col xs={50} md={5}>
                    <Image
                      src={reclamation}
                      style={{ width: "10rem", height: "9rem" }}
                      rounded
                    />
                  </Col>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Card border="primary" style={{ width: "16rem", marginTop: "5%" }}>
              <Card.Header>Statistiques</Card.Header>
              <Card.Body>
                <Col xs={50} md={5}>
                  <Image
                    src={statistique}
                    style={{ width: "10rem", height: "9rem" }}
                    rounded
                  />
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
