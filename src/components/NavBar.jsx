import React, { Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useCart from './hooks/useCart';
import Media from 'react-media';

function NavBar(props) {
  const { cartCount } = useCart();
  const nav = useNavigate()

  const handleCheckout = () => {
    nav('/Checkout');
  }

  return (
    <React.Fragment>
      <nav style={{ overflow: 'hidden'}} className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <NavLink className="navbar-brand ms-3 me-4 m-2" to="/">
              <i className="fa-brands fa-shopify fa-2xl"></i>
            </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Media queries={{
                small: "(max-width: 989px)",
                medium: "(min-width: 990px)",
              }}>
                {matches => (
                  <Fragment>
                    {matches.small && 
                      <div>
                        <NavLink className="nav-item nav-link ms-2 fs-4" to="/">
                          Home
                        </NavLink>
                        <NavLink className="nav-item nav-link ms-2 fs-4" to="/Shop">
                          Shop
                        </NavLink>
                        <NavLink className="nav-item nav-link ms-2 fs-4" to="/About">
                          About
                        </NavLink>
                      </div>}
                    {matches.medium && 
                      <Fragment>
                        <NavLink className="nav-item nav-link ms-2 fs-4" to="/">
                          Home
                        </NavLink>
                        <NavLink className="nav-item nav-link ms-3 fs-4" to="/Shop">
                          Shop
                        </NavLink>
                        <NavLink className="nav-item nav-link ms-3 fs-4" to="/About">
                          About
                        </NavLink>
                      </Fragment>}
                  </Fragment>
                )}
              </Media>
            </ul>
            <button onClick={handleCheckout} className="btn btn-outline-light position-relative">Checkout <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">{cartCount}<span className="visually-hidden">unread messages</span></span></button>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavBar;