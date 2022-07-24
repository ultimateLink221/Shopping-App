import './App.css';
import { Routes, Route, } from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import NavBar from './components/NavBar';
import About from './components/About';
import Product from './components/Product';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop' element={<Shop />} />
          <Route path='/Shop/:id' element={<Product />} />
          <Route path='/Checkout' element={<Checkout />} />
          <Route path='/About' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
