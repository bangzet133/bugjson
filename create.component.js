import { useNavigate } from 'react-router-dom'
import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';


export default async function CreateProduct() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [validationError, setValidationError] = useState({});
    const createProduct = async (e) => {
        e.preventDefault();
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)

    await axios.post(`http://localhost:8000/api/products`, formData).then(({ response }) => {
        Swal.fire({
            icon: "success",
            text: response.message
        })
        navigate("/")
    }).catch(({ response }) => {
        if (response.status === 422) {
            setValidationError(response.data.errors)
        } else {
            Swal.fire({
                text: response.data.message,
                icon: "error"
            })
        }
    })
}
return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create Product</h4>
                        <div className="form-wrapper">
                            <h4 className="card-title">Create Product</h4>
                            <div className="form-wrapper">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {Object.entries(validationError).map((error) => (
                                                            <li>{error}</li>
                                                        ))
                                                        }
                                                    </ul>
                                                    <div />
                                                </div>
                                            </div>
                                        </div>
                                <Form onSubmit={createProduct}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="nama produk">
                                                <Form.Label>Nama Produk</Form.Label>
                                                <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Description">
                                                <Form.Label>Deskripsi produk</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={description} onChange={(event) => setDescription(event.target.value)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button type="submit" variant="primary" className="mt-2" size="md">
                                        save
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}