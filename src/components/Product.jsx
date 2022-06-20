import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCart from './hooks/useCart';
import Media from 'react-media';

function Product(props) {
  const { cartImage, handleCart } = useCart();
  const params = useParams();
  const nav = useNavigate();

  const [data, setData] = useState({});
  const [initialRender, setInitialRender] = useState(true);
  const [secondRender, setSecondRender] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7ac0e52bddmshcf45067968f94ddp1791d2jsn967dcc85c962',
      'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
    }
  };

  const fetchData = () => {
    fetch(`https://amazon24.p.rapidapi.com/api/product/${params.id}?country=US`, options)
    .then(response => response.json())
    .then(response => setData(response))
    .catch(err => console.error(err));
  }

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    if (initialRender){
      setInitialRender(false);
    }
    else {
      if (data.product_title) {
        setSecondRender(true);
      }
    }
  }, [data]);

  const handleNav = (data) => {
    handleCart(data)
    nav('/Shop')
  }

  return (
    <div style={{textAlign: 'center',}}>
      <div className='m-2 mt-4'>
        <Media queries={{
          small: "(max-width: 599px)",
          medium: "(min-width: 600px)",
        }}>
          {matches => (
            <Fragment>
              {matches.small && <img style={{ maxWidth: '300px'}} src={ data.product_main_image_url ? data.product_main_image_url : cartImage}></img>}
              {matches.medium && <img style={{ height: '300px'}} src={ data.product_main_image_url ? data.product_main_image_url : cartImage}></img>}
            </Fragment>
          )}
        </Media>
      </div>
      <div>
        <h2>{data.product_title ? data.product_title : 'Loading...'}</h2>
        <p>{data.app_sale_price ? '$' + (parseInt(data.app_sale_price)).toFixed(2) : '0.01'}</p>
        <div style={{margin: '0 18vw 20px'}}>
        { Array.isArray(data.feature_bullets) ? data.feature_bullets?.map((bullet, index) => {
          return (<p key={index}>{bullet + ' '}</p>)
        }) : 'No Description' }
        </div>
        {
          secondRender ? <button onClick={() => handleNav(data)} className="btn btn-warning mb-4">Add to Cart</button> : <button onClick={() => handleNav(data)} className="btn btn-warning mb-4" disabled>Add to Cart</button>
        }
      </div>
    </div>
  );
}

export default Product;