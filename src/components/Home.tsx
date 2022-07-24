import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Media from 'react-media';

function Home() {
  const nav = useNavigate();

  const handleClick = () => {
    nav('/Shop');
  }

  return (
    <div className='mt-4' style={{ textAlign: 'center' }} >
      <h1>Welcome to Our Website!</h1>
      <div>
        <Media queries={{
          small: "(max-width: 599px)",
          medium: "(min-width: 600px) and (max-width: 799px)",
          large: "(min-width: 800px)"
        }}>
          {matches => (
            <Fragment>
              {matches.small && <img style={{ width: '240px'}} src='https://preply.com/wp-content/uploads/2018/04/shopping_bags.jpg'></img>}
              {matches.medium && <img style={{ width: '500px'}} src='https://preply.com/wp-content/uploads/2018/04/shopping_bags.jpg'></img>}
              {matches.large && <img style={{ width: '700px'}} src='https://preply.com/wp-content/uploads/2018/04/shopping_bags.jpg'></img>}
            </Fragment>
          )}
        </Media>
      </div>
      <button onClick={handleClick} type="button" className="btn btn-outline-secondary m-5">Start Shopping</button>
    </div>
  );
}

export default Home;