import React from 'react'
import Header from "../components/Header.jsx"
import Hero from "../components/Hero.jsx"
import Footer from "../components/Footer.jsx"
import SearchBar from '../components/SearchBar.jsx'

const Layout = (Props)=> {
    return(
    <div className = "flex flex-col min-h-screen">
    <Header />
    <Hero />
    <div className='container mx-auto'>
        <SearchBar />
    </div>
    <div className = "p-4 container mx-auto py-10 flex-1">
        {Props.children}
    </div>
    <Footer />
    </div>
    )
}
export default Layout;