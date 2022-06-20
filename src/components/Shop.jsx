import React, { useEffect, useState } from 'react';
import Card from './Card';
import Data from '../TempBackend/tempBackend';
import ReactPaginate from 'react-paginate';

function Shop(props) {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7ac0e52bddmshcf45067968f94ddp1791d2jsn967dcc85c962',
      'X-RapidAPI-Host': 'amazon24.p.rapidapi.com'
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://amazon24.p.rapidapi.com/api/product?categoryID=aps&keyword=iphone&country=US&page=1', options)
      const data = await response.json()
      setData(data.docs)
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const cardsPerPage = 12;
  const pagesVisited = pageNumber * cardsPerPage;

  const pageCount = Math.ceil(data?.length / cardsPerPage);

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  if (loading) return <h1 className='m-2'>Loading...</h1>

  return (
    <div className='m-3'>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {data?.slice(pagesVisited, pagesVisited + cardsPerPage).map((card, index) => {
          return <Card key={index} product={card} productId={card.product_id} image={card.product_main_image_url} text={card.app_sale_price} title={card.product_title} />
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount} 
          onPageChange={changePage}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination mt-3'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default Shop;