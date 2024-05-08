import '../index.css'
import './Home.css'
import { Container, Row, Col, Card } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import NavBar from '../Components/Navbar'
import Dhl from '../images/DHL.png'
import Correios from '../images/Correios.png'
import Fedex from '../images/Fedex.png'

const App = () => {

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  const images = [Dhl, Correios, Fedex];
  const titles = ["DHL", "CORREIOS", "FEDEX"];
  const links = ["/DHL", "/Correios", "/Fedex"];

  return (
    <Container fluid style={{ backgroundColor: '#f2f8fb' }}>
      <NavBar title="Consulta Encomendas" />
      <Container className="my-5">
        <Row className="g-5 justify-content-center">
          {images.map((image, idx) => (
            <Col md={4} key={idx}>
              <Link to={links[idx]} className="card-link">
                <Card className="shadow-sm custom-card">
                  <Card.Img variant="top" src={image} />
                  <Card.Body>
                    <Card.Title style={{textAlign:'center'}}>{titles[idx]}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </Container>
  )
}

export default App
