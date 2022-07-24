import React, { useState, useEffect, Fragment } from 'react';
import useCart from './hooks/useCart';
import { useNavigate } from 'react-router-dom';
import Media from 'react-media';

function Checkout() {
  const { cartPrice, cartCount, cartItems, setCartItems, setCartCount, setCartPrice, handleClearCart } = useCart();
  const nav = useNavigate();

  const [items, setItems] = useState<any[] | undefined>([]);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems])

  const handleCheckout = () => {
    nav('/');
    handleClearCart();
    alert('Success');
  }

  const handleClear = () => {
    handleClearCart();
    setItems([]);
  }

  const handleDelete = (id: number | string ) => {
    const deletedItem = cartItems?.filter(item => item.product_id === id);
    const newItems = cartItems?.filter(item => item.product_id !== id);
    setCartItems(newItems);
    if(cartCount != undefined)
      setCartCount(cartCount - 1);
    if(deletedItem != undefined && cartPrice != undefined)
      setCartPrice((parseFloat((cartPrice).toFixed(2)) - parseFloat(deletedItem[0].app_sale_price)));
    // else alert('something went wrong please try again');
  }

  return (
    <div style={{ width: '80vw', margin: '0 auto'}}>
      <h1 style={{ margin: '20px 0', textAlign: 'center'}}>Checkout</h1>
      <div>

        <table style={{ margin: '20px 0'}} className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
          {items?.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <Media queries={{
                  small: "(max-width: 599px)",
                  medium: "(min-width: 600px) and (max-width: 799px)",
                  large: "(min-width: 800px)"
                }}>
                  {matches => (
                    <Fragment>
                      {matches.small && 
                        <Fragment>
                          <td >{item.product_title.length < 5 ? item.product_title : item.product_title.length > 5 ? item.product_title.substring(0, 5) + '...' : '...'}</td>
                          <td >{item.app_sale_price ? '$' + (parseInt(item.app_sale_price)).toFixed(2) : '$0'}</td>
                          <td><a onClick={() => handleDelete(item.product_id)} className="btn btn-primary">X</a></td>
                        </Fragment>}
                      {matches.medium && 
                        <Fragment>
                          <td >{item.product_title.length < 12 ? item.product_title : item.product_title.length > 12 ? item.product_title.substring(0, 12) + '...' : '...'}</td>
                          <td >{item.app_sale_price ? '$' + (parseInt(item.app_sale_price)).toFixed(2) : '$0.00'}</td>
                          <td><a onClick={() => handleDelete(item.product_id)} className="btn btn-primary">X</a></td>
                        </Fragment>}
                      {matches.large && 
                        <Fragment>
                          <td >{item.product_title.length < 50 ? item.product_title : item.product_title.length > 50 ? item.product_title.substring(0, 50) + '...' : '...'}</td>
                          <td >{item.app_sale_price ? '$' + (parseInt(item.app_sale_price)).toFixed(2) : '$0.00'}</td>
                          <td><a onClick={() => handleDelete(item.product_id)} className="btn btn-primary">Delete</a></td>
                        </Fragment>}
                    </Fragment>
                  )}
                </Media>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
      <h3>Total price: ${(cartPrice)?.toFixed(2)}</h3>
      <h3>After Discount: $0.01</h3>
      <div style={{ textAlign: 'center'}}>
        <a onClick={handleClear} className="btn btn-primary mt-2">Clear Cart</a>
        <a onClick={handleCheckout} className="btn btn-warning mt-2 ms-2">Checkout</a>
      </div>
    </div>
  );
}

export default Checkout;