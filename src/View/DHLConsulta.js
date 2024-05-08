import '../index.css'
import { Container, Row, Col, Card, Form, Button, ListGroup, ProgressBar } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Footer from '../Components/Footer'
import NavBar from '../Components/Navbar'
import {showMessageError, showMessageSuccess} from '../utils'
import { FaTruck, FaMapMarkedAlt, FaRegCalendarAlt, FaInfoCircle, FaFilePdf } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const DHLConsulta = () => {

    const [shipmentId, setShipmentId] = useState('');
    const [shipmentDetails, setShipmentDetails] = useState(null);

    const handleSearch = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/track?trackingNumber=${shipmentId}`);
          showMessageSuccess('Encomenda Encontrada!')
          setShipmentDetails(response.data.shipments[0]); 
        } catch (error) {
          showMessageError('Erro ao buscar detalhes do envio');
        }
      };

    const calculateProgress = (statusCode) => {
        switch(statusCode) {
            case "delivered":
                return 100;
            case "transit":
                return 75;
            case "unknown":
                return 25;
            default:
                return 0;
        }
    };

    const generatePdf = () => {
      const doc = new jsPDF();
    
      doc.setFontSize(16);
      doc.text("Detalhes da Encomenda", 14, 20);
      doc.setFontSize(12);
      doc.line(14, 25, 196, 25); 
    
      doc.text(`ID do Envio: ${shipmentDetails.id}`, 14, 35);
      doc.text(`Origem: ${shipmentDetails.origin.address.addressLocality}`, 14, 45);
      doc.text(`Destino: ${shipmentDetails.destination.address.addressLocality}`, 14, 55);
      doc.text(`Status: ${shipmentDetails.status.description}`, 14, 65);
      doc.line(14, 70, 196, 70); 
    
      let currentY = 80; 
    
      shipmentDetails.events.forEach((event, index) => {
        if (currentY > 280) { 
          doc.addPage();
          currentY = 20; 
        }
    
        doc.setFontSize(10);
        doc.setTextColor(100);
    
        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255);
        doc.circle(14, currentY + 10, 2, 'FD');
    
        if (index !== shipmentDetails.events.length - 1) {
          doc.line(14, currentY + 12, 14, currentY + 45); 
        }
    
        doc.setDrawColor(0); 
        doc.setFillColor(230, 230, 250); 
        doc.rect(20, currentY, 170, 30, 'FD'); 
    
        doc.setTextColor(0, 0, 255); 
        doc.text(`${event.timestamp} - ${event.location.address.addressLocality}`, 25, currentY + 7);
        doc.setTextColor(0, 0, 0); 
        doc.text(`Evento: ${event.description}`, 25, currentY + 17);
        doc.text(`Status: ${event.statusCode}`, 25, currentY + 27);
    
        currentY += 35; 
      });
    
      doc.save('shipment-details.pdf');
    };        

  return (
    <Container fluid style={{ maxHeight: '100vh', overflowY: 'hidden' }}>
      <NavBar title="Consulta Encomendas" />
      <Container className="my-5">
        <Row>
          <Col md={6} className="mx-auto">
            <Form>
              <Form.Group controlId="formShipmentId">
                <Form.Label>Insira o ID da Encomenda:</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Digite o ID da encomenda"
                  value={shipmentId}
                  onChange={(e) => setShipmentId(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSearch} className="mt-3">Pesquisar</Button>
            </Form>
          </Col>
        </Row>
        <Container style={{minHeight:'4vh'}}></Container>
        <Container style={{ maxHeight: '50vh', overflowY: 'auto' }}>
          {shipmentDetails && (
            <Row className="mt-4">
              <Col md={8} className="mx-auto">
              <Button 
                variant="secondary" 
                onClick={generatePdf}
                style={{
                  backgroundColor: '#e74c3c', 
                  borderColor: '#c0392b',
                  color: 'white'
                }}
              >
                <FaFilePdf color="#fff" style={{ marginRight: 5 }} /> Gerar PDF
              </Button>
                <Card className="shadow">
                  <Card.Header className="bg-primary text-white"><FaTruck /> Detalhes da Encomenda</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item><FaInfoCircle /> ID do Envio: {shipmentDetails.id}</ListGroup.Item>
                    <ListGroup.Item><FaMapMarkedAlt /> Origem: {shipmentDetails.origin.address.addressLocality}</ListGroup.Item>
                    <ListGroup.Item><FaMapMarkedAlt /> Destino: {shipmentDetails.destination.address.addressLocality}</ListGroup.Item>
                    <ListGroup.Item><FaRegCalendarAlt /> Status: {shipmentDetails.status.description}</ListGroup.Item>
                    {shipmentDetails.events.map((event, index) => (
                      <ListGroup.Item key={index} className="mb-2">
                        <div><FaRegCalendarAlt /> Data: {event.timestamp}</div>
                        <div><FaMapMarkedAlt /> Local: {event.location.address.addressLocality}</div>
                        <div><FaInfoCircle /> Status: {event.description}</div>
                        <div><FaInfoCircle /> Código de Status: {event.statusCode}</div>
                        <ProgressBar 
                          now={calculateProgress(event.statusCode)} 
                          variant="success"
                          label={`${calculateProgress(event.statusCode)}%`}
                          className="mt-2"
                        />
                        <hr />
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </Container>
      <Footer />
    </Container>
  )
}

export default DHLConsulta
