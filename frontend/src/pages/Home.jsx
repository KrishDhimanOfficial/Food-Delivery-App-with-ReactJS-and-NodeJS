import React, { useState, useEffect } from 'react'
import Banner from '../components/Banner'
import Explore_menu from '../components/Explore-menu'
import Dishes from '../components/Dishes'
import axios from 'axios'
import { DishesContextProvider } from '../contexts/DishesContext'
import config from '../config/config'
import ErrorBoundary from '../components/ErrorBoundary'

function Home() {
    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(false)

    const fetchProducts = async () => {
        setloading(true)
        const response = await axios.get(`${config.Server_URL}/get/products`)
        if (response.data.length > 0) setproducts(response.data)
        setloading(false)
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <>
            <Banner />
            <DishesContextProvider value={{ products, setproducts, fetchProducts, loading, setloading }}>
                <Explore_menu />
                <ErrorBoundary>
                    <Dishes />
                </ErrorBoundary>
            </DishesContextProvider>
        </>
    )
}

export default Home
