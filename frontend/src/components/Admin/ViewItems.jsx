import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useProductContext } from '../../contexts/ProductContext'

function ViewItems() {
    const [items, setItems] = useState([])
    const [message, setmessage] = useState('')
    const { setproduct, setupdateproductImg } = useProductContext()


    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3000/admin/api/get/products')
        if (response.data.message) toast.error(response.data.message)
        if (response.data.length > 0) setItems(response.data)
    }

    // To get Single Product data
    const getsingleproductData = async (id) => {
        const response = await axios.get(`http://localhost:3000/admin/api/product/${id}`)
        setproduct(response.data[0])
        setupdateproductImg(response.data[0].product_image)
    }

    // To delete product
    const deleteProduct = async (id) => {
        const response = await axios.delete(`http://localhost:3000/admin/api/product/${id}`)
        if (response.data.message == 'Successfully Deleted!') {
            toast.success(response.data.message)
            setmessage(response.data.message)
        } else {
            toast.error(response.data.message)
        }
        setTimeout(() => { setmessage('') }, 10)
    }

    useEffect(() => { fetchProducts() }, [message])
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>s.no</th>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (
                                <tr key={i} className='table-list'>
                                    <td>{i + 1}</td>
                                    <td>{item.product_name}</td>
                                    <td>
                                        <img
                                            className='category-list-img w-50'
                                            src={`http://localhost:3000/uploads/productImages/${item.product_image}`}
                                            alt="" loading='lazy' />
                                    </td>
                                    <td>
                                        {item.product_category.category_name}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <button type='button'
                                                onClick={() => getsingleproductData(item._id)}
                                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                className='btn  btn-primary'>
                                                Edit
                                            </button>
                                            <button type='button'
                                                onClick={() => deleteProduct(item._id)}
                                                className='btn  btn-danger'>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewItems
