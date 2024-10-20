import React, { useState, useEffect } from 'react'
import Banner from '../components/banner'
import Explore_menu from '../components/Explore-menu'
import Dishes from '../components/Dishes'
import axios from 'axios'
import { DishesContextProvider } from '../contexts/DishesContext'

function Home() {
    const [products, setproducts] = useState([])


    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3000/api/get/products')
        if (response.data.length > 0) setproducts(response.data)
    }
    useEffect(() => { fetchProducts() }, [])
    return (
        <>
            <Banner />
            <DishesContextProvider value={{ products, setproducts, fetchProducts }}>
                <Explore_menu />
                <Dishes />
            </DishesContextProvider>
        </>
    )
}

export default Home
