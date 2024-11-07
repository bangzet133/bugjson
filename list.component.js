import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function ListComponent() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        await axios.get(`http://localhost:8000/api/products`).then(({ response }) => {
            setProducts(response.data);
        })
    }
    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            return result.isConfirmed
        });
        if (!isConfirm) {
            return;
        }
        await axios.delete(`http://localhost:8000/api/products/${id}`).then(({ response }) => {
            Swal.fire({
                icon: "success",
                text: response.message
            })
            fetchProducts()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className='col-12'>
                    <Link className='btn btn-primary mb-2 float-end' to={"/product/create"}>
                        Create Product
                    </Link>
                    <div className="col-12">
                        <div className="card card-body">
                            <div className="table-responsive"></div>
                            <table className="table table-bordered mb-0 text-center"></table>
                            <thead>
                                <tr>
                                    <th>Nama Produk</th>
                                    <th>Deskripsi Produk</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length > 0 && (
                                        products.map((row, key)=>{
                                        <tr key={key}>
                                        <td>{row.title}</td>
                                        <td>{row.description}</td>
                                     </tr>
                                        })
                                    )
                                }
                            </tbody>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}