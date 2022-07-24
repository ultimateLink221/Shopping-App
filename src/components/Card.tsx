import React, { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from './hooks/useCart';

interface CardProps {
  image: string;
  title: string;
  text: string;
  productId: any;
  product: any;
}

function Card({ image, title, text, productId, product }: CardProps) {
  const { handleCart, setCartImage } = useCart();
  const nav = useNavigate();

  const handleNav = () => {
    setCartImage(image ? image : 'https://pbs.twimg.com/profile_images/1272604472238358529/BSwH0ezY_400x400.png');
    setTimeout(() => {
      nav(`/Shop/${productId}`)
    }, 10)
  }

  return (
    <div className='col'>
      <div style={{ height: '400px'}} className="card">
        <img src={image ? image : "https://pbs.twimg.com/profile_images/1272604472238358529/BSwH0ezY_400x400.png"} className="card-img-top" style={{ height: '200px'}} alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title ? title : 'No Title'}</h5>
          <p className="card-text">{text ? text : 'Not Listed.'}</p>
          {/* @ts-ignore */}
          <div disabled boolean style={{ left: '0', bottom: '0', position: 'absolute', padding: '16px'}}>
          {/* @ts-ignore */}
            <a onClick={handleNav} className="btn btn-primary" disabled>Details</a>
          {/* @ts-ignore */}
            <a onClick={() => handleCart(product)} className="btn btn-warning  ms-2" disabled>Add to Cart</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;