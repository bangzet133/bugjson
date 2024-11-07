import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import logo from './logo.svg';



import CreateProduct from "./components/product/create.component";


function App() {
  return (
    <Router>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            <img src={logo} width={100} alt="logo" />
            <span> MY INVENTORY </span>
          </Link>
        </Container>
      </Navbar>
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="./components/product/create.component" element={<CreateProduct />} />
            </Routes>
            </Col>
          </Row>
          </Container>
          </Router>
  )  
}

          export default App;
