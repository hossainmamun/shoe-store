import React from 'react';
import Footer from '../ReusePage/Footer.jsx';
import NavBar from '../ReusePage/NavBar.jsx';
import TopHeader from '../ReusePage/TopHeader.jsx';
import NewsLetter from './NewsLetter.jsx';
import ProductList from './ProductList.jsx';

const Home = () => {
    return (
        <div>
            <TopHeader />
            <NavBar />
            <ProductList />
            <NewsLetter />
            <Footer/>
        </div>
    );
};

export default Home;