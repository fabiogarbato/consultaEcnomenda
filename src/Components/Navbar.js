import { Navbar, Row, Col } from 'react-bootstrap'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../AuthProvider'

const NavBar = ({ title }) => {

  return (
    <Navbar
      id="inicio"
      expand="lg"
      style={{
        backgroundColor: '#ffd700',
        minWidth: '100vh',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        opacity: '0.9',
        minHeight: '12vh',
      }}
    >
      <Row className="w-100">
        <Col
          xs={12}
          md={4}
          className="d-flex justify-content-center justify-content-md-start"
        >
        </Col>
        <Col
          xs={12}
          md={4}
          className="d-flex justify-content-center align-items-center"
        >
          <span
            className="fira-sans-condensed-black"
            style={{ fontSize: '35px', color: 'black' }}
          >
            {title}
          </span>
        </Col>
      </Row>
    </Navbar>
  )
}

export default NavBar
