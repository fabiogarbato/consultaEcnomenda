import '../index.css'
import './Home.css'
import { Container, Row, Col, Card } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import NavBar from '../Components/Navbar'

const DHLConsulta = () => {

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <Container fluid style={{ backgroundColor: '#f2f8fb' }}>
      <NavBar title="Consulta Encomendas" />
      
      <Footer />
    </Container>
  )
}

export default DHLConsulta
